import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all books initially
  useEffect(() => {
    fetchBooks();
  }, []);

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        searchBooks(searchTerm);
      } else {
        fetchBooks();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/books`
      );
      const data = response;

      setBooks(data.data.allBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchBooks = async (term) => {
    try {
      setIsLoading(true);
      // Replace with your actual search API endpoint
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/searchBooks/${term}`
      );
      const data = response;
      setBooks(data.data.filteredBooks);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      console.log("deleted", bookId);
      await axios.delete(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/book/delete/${bookId}`
      );
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = async (book) => {
    try {
      navigate("/book/edit", { state: book });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  let navigate = useNavigate();
  const handleAddnewBook = () => {
    navigate("/book/addNewBook");
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <button
          button
          onClick={handleAddnewBook}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Book
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search books..."
          className="w-full pl-10 pr-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Books list */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : books.length === 0 ? (
          <div className="text-center py-8">No books found</div>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg mx-8 shadow-md overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                {/* Book image */}
                <div className="w-32 h-40 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={book.url || "/api/placeholder/128/160"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">
                    {book.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <p className="text-gray-600">Genre: {book.genre}</p>
                    <p className="text-gray-600">Price: ${book.price}</p>
                    <p className="text-gray-600">
                      Borrowed: {book.borrowCount} times
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 sm:flex-col">
                  <button
                    onClick={() => handleEdit(book)}
                    className="p-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="p-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
