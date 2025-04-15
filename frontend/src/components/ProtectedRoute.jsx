import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    // Redirect them to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
