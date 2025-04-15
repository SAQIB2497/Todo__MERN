import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { signup } from "../store/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(signup({ name, email, password }));
      if (signup.fulfilled.match(resultAction)) {
        toast.success("Signup successful!");
        navigate("/login"); 
      } else {
        throw new Error(resultAction.error.message);
      }
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md px-8 py-8 bg-gray-800 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div>
            <label htmlFor="name" className="text-white mb-2 block text-lg">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-5 py-3 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
