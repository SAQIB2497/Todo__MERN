import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        throw new Error(resultAction.error.message);
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg px-8 py-10 bg-gray-800 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="text-white mb-2 block text-lg">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="text-white mb-2 block text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
