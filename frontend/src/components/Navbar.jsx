import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white mx-10">Todo</div>

        <div className="flex items-center space-x-6 mx-10">
          {token ? (
            <>
              <span className="text-gray-300">👤 {user?.username || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-gray-300 hover:text-white transition"
              >
                Signup
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;