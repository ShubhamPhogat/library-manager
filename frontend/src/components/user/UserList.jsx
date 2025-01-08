import React, { useState, useEffect } from "react";
import {
  SearchIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        searchUsers(searchTerm);
      } else {
        fetchUsers();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/users/`
      );
      const data = response;
      console.log(data.data);
      setUsers(data.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const goTosignUp = () => {
    navigate("/signUp");
  };

  const searchUsers = async (term) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/searchUsers/${term}`
      );
      const data = response;
      setUsers(data.data);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button
          onClick={goTosignUp}
          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-sm"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search users..."
          className="pl-10 w-full px-4 py-2 border border-purple-300 focus:border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users list */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : users && users.length === 0 ? (
          <div className="text-center py-8">No users found</div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg mx-8 shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* User avatar */}
                  <div className="w-16 h-16 rounded-full bg-purple-100 overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-purple-100 overflow-hidden flex items-center justify-center">
                      <FaUserGraduate className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>

                  {/* User details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">
                      {`${user.firstName} ${user.lastName}`}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      <p className="text-gray-600">Email: {user.email}</p>
                      <p className="text-gray-600">Role: {user.role}</p>
                      <p className="text-gray-600">
                        Books Borrowed: {user.borrowedBooks || 0}
                      </p>
                      <p className="text-gray-600">
                        Join Date:{" "}
                        {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 sm:flex-col">
                    <button className="w-10 h-10 p-0 rounded-md border border-purple-500 text-purple-500 hover:bg-purple-50 flex items-center justify-center">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="w-10 h-10 p-0 rounded-md border border-red-500 text-red-600 hover:bg-red-50 flex items-center justify-center"
                      onClick={() => handleDelete(user.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
