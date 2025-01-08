import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const EditBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    if (book) {
      setBookData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        price: book.price || "",
        imageUrl: book.imageUrl || "",
        description: book.description || "",
      });
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/book/delete`,
        bookData
      );

      if (response) {
        navigate("/book/list");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Book</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Book Title
                </label>
                <input
                  id="title"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author Name
                </label>
                <input
                  id="author"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Genre
                </label>
                <input
                  id="genre"
                  name="genre"
                  value={bookData.genre}
                  onChange={handleChange}
                  placeholder="Enter genre"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={bookData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  value={bookData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  placeholder="Enter book description"
                  className="w-full h-32 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/books")}
                className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
