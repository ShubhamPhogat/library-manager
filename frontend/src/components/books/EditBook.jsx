import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const EditBook = () => {
  const location = useLocation();
  const book = location.state; // Extracting book from location.state
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: book.title,
    publisher: book.publisher,
    genre: book.genre,
    price: book.price,
    quantity: book.quantity,
    desc: book.desc,
    author: book.author,
    id: book._id,
  });
  const [errors, setErrors] = useState({});

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Biography",
    "History",
    "Self-Help",
    "Children",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bookData.title.trim()) newErrors.title = "Title is required";
    if (!bookData.publisher.trim())
      newErrors.publisher = "Publisher is required";
    if (!bookData.genre) newErrors.genre = "Genre is required";
    if (!bookData.price || bookData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!bookData.quantity || bookData.quantity <= 0)
      newErrors.quantity = "Valid quantity is required";
    if (!bookData.desc.trim()) newErrors.desc = "Description is required";
    if (!bookData.author.trim()) newErrors.author = "Author is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(book._id);
    try {
      if (validateForm()) {
        const res = await axios.put(
          `${process.env.REACT_APP_BASE_BACKEND_URL}/book/edit/${book._id}`,
          bookData
        );

        if (res) {
          toast.success("Book updated successfully");
          navigate("/main");
        }
      }
    } catch (error) {
      console.error("Error updating book", error);
      toast.error("Error updating book");
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-purple-600">Edit Book</h2>
          <p className="text-gray-500 mt-2">Update the book details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Book Title*
            </label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="mt-1 text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Publisher*
            </label>
            <input
              type="text"
              name="publisher"
              value={bookData.publisher}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter publisher"
            />
            {errors.publisher && (
              <p className="mt-1 text-red-500 text-sm">{errors.publisher}</p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Genre*
            </label>
            <select
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a genre</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="mt-1 text-red-500 text-sm">{errors.genre}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Price*
            </label>
            <input
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="mt-1 text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Quantity*
            </label>
            <input
              type="number"
              name="quantity"
              value={bookData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter quantity"
            />
            {errors.quantity && (
              <p className="mt-1 text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Description*
            </label>
            <textarea
              name="desc"
              value={bookData.desc}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter description"
            />
            {errors.desc && (
              <p className="mt-1 text-red-500 text-sm">{errors.desc}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Author*
            </label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter author"
            />
            {errors.author && (
              <p className="mt-1 text-red-500 text-sm">{errors.author}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
