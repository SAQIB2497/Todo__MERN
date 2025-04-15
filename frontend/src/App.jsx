// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/authSlice";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { persistor } from "./store/store"; // Import persistor

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch, token]);

  return (
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="bg-gray-900 min-h-screen">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </PersistGate>
    </Router>
  );
}

export default App;
