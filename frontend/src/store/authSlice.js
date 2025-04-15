import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post("/auth/signup", userData);
  return response.data;
});

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
});

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("token");
  return null;
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (token) => {
    const response = await axios.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;