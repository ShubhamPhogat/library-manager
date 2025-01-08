import React, { useState } from "react";
import { LoginBg } from "../assets/index.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Log = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/login`,
        formData
      );
      if (res.status === 200) {
        console.log("login success");
        navigate("/main");
      }
    } catch (error) {
      console.log("error in login");
    }
    console.log("Form Data Submitted:", formData);
    // Add any further processing or API calls here
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section with Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-purple-50">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-purple-500/20">
          <img
            src={LoginBg}
            alt="Library Scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-10 text-white"></div>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-gray-500 mb-8">How do I get started digizeara?</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-purple-600 mb-2">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter Email or Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-600 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-purple-600" />
                <label className="ml-2 text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-500"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Log;
