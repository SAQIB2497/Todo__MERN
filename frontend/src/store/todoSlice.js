import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// Initial state
const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const createTask = createAsyncThunk(
  "todos/createTask",
  async ({ title, description, token }) => {
    console.log("Creating task with data:", { title, description });
    const response = await axios.post(
      "/todo/create",
      { title, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Create task response:", response.data);
    return response.data.Todo;
  }
);

export const fetchTasks = createAsyncThunk(
  "todos/fetchTasks",
  async (token) => {
    console.log("Fetching tasks with token:", token);
    const response = await axios.get("/todo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched tasks:", response.data);
    return response.data; // This should return the tasks
  }
);

// Update Task thunk
export const updateTask = createAsyncThunk(
  "todos/updateTask",
  async ({ id, title, description, completed, token }) => {
    const response = await axios.put(
      `/todo/update/${id}`,
      { title, description, completed },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.todo;
  }
);

// Delete Task thunk
export const deleteTask = createAsyncThunk(
  "todos/deleteTask",
  async ({ id, token }) => {
    await axios.delete(`/todo/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

// Create slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
