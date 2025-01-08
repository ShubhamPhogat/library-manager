import React from "react";
import { useNavigate } from "react-router-dom";

const VerticalNav = () => {
  const navigate = useNavigate();
  const navigateToBooks = () => {
    navigate("/book/list");
  };

  const navigateToUser = () => {
    navigate("/user/list");
  };

  return (
    <nav className="w-64 bg-purple-400 dark:bg-gray-800 h-screen p-4">
      <div className="space-y-4">
        <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Dashboard
        </div>
        <div
          onClick={navigateToUser}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Users
        </div>
        <div
          onClick={navigateToBooks}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Books
        </div>
        <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Statistics
        </div>
      </div>
    </nav>
  );
};

export default VerticalNav;
