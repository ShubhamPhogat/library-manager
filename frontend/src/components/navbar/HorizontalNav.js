import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const HorizontalNav = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const onLogout = async () => {};

  return (
    <nav
      className={`flex justify-between items-center p-4 border-b ${
        isDark
          ? "bg-gray-800 text-white border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">LOGO</span>
        <input
          type="text"
          placeholder="Search..."
          className={`p-2 rounded-lg ${
            isDark
              ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
              : "bg-gray-100 text-gray-800 placeholder-gray-500"
          }`}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          {isDark ? "🌞" : "🌙"}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/avatar.jpg"
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-purple-500"
            />
            <span>Admin</span>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNav;
