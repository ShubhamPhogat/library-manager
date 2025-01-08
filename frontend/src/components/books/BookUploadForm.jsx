import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BookUploadForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [bookData, setBookData] = useState({
    title: "",
    publisher: "",
    image: null,
    genre: "",
    price: "",
    quantity: "",
    desc: "",
    author: "",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bookData.title.trim()) newErrors.title = "Title is required";
    if (!bookData.publisher.trim())
      newErrors.publisher = "Publisher is required";
    if (!bookData.image) newErrors.image = "Cover image is required";
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
    try {
      if (validateForm()) {
        const formData = new FormData();

        // Append all book data to FormData
        Object.keys(bookData).forEach((key) => {
          formData.append(key, bookData[key]);
        });
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        const res = await axios.post(
          "http://localhost:8000/book/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res) {
          toast.success("Book uploaded successfully");
          // Reset form
          setBookData({
            title: "",
            publisher: "",
            image: null,
            genre: "",
            price: "",
            quantity: "",
            desc: "",
            author: "",
          });
          setImagePreview(null);
        }
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Error uploading book");
    }
  };

  // Rest of your JSX remains the same
  return (
    <div className="min-h-screen bg-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-purple-600">
            Upload New Book
          </h2>
          <p className="text-gray-500 mt-2">Enter the book details below</p>
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
              placeholder="Enter publisher name"
            />
            {errors.publisher && (
              <p className="mt-1 text-red-500 text-sm">{errors.publisher}</p>
            )}
          </div>

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
              placeholder="Enter publisher name"
            />
            {errors.publisher && (
              <p className="mt-1 text-red-500 text-sm">{errors.author}</p>
            )}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Cover Image*
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-auto"
                    />
                  </div>
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {errors.image && (
              <p className="mt-1 text-red-500 text-sm">{errors.image}</p>
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
              <option value="">Select genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="mt-1 text-red-500 text-sm">{errors.genre}</p>
            )}
          </div>

          {/* Price and Quantity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-600 mb-2">
                Price*
              </label>
              <input
                type="number"
                name="price"
                value={bookData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="mt-1 text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-600 mb-2">
                Quantity*
              </label>
              <input
                type="number"
                name="quantity"
                value={bookData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <p className="mt-1 text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* desc */}
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-2">
              desc*
            </label>
            <textarea
              name="desc"
              value={bookData.desc}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter book desc"
            />
            {errors.desc && (
              <p className="mt-1 text-red-500 text-sm">{errors.desc}</p>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Upload Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookUploadForm;
