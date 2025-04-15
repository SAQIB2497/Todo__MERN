// store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import todoReducer from "./todoSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Root reducer combining both slices
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
});

// Persist config for full root
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "todos"], // Now persisting both auth and todos
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
