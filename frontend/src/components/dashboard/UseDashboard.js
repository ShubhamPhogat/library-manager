import React, { useState } from "react";

const UserDashboard = () => {
  // Sample user data
  const user = {
    name: "John Doe",
    avatar: "/path-to-avatar.jpg",
    booksIssued: 4,
    totalFine: 25.5,
    returnedBooks: 12,
  };

  // Sample book collections
  const [collections] = useState({
    bestChoice: [
      {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "/book1.jpg",
        rating: 4.5,
      },
      {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        cover: "/book2.jpg",
        rating: 4.8,
      },
      {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        cover: "/book3.jpg",
        rating: 4.6,
      },
      {
        id: 4,
        title: "Dune",
        author: "Frank Herbert",
        cover: "/book4.jpg",
        rating: 4.7,
      },
      {
        id: 5,
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "/book5.jpg",
        rating: 4.9,
      },
    ],
    trending: [
      {
        id: 6,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "/book6.jpg",
        rating: 4.3,
      },
      {
        id: 7,
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        cover: "/book7.jpg",
        rating: 4.2,
      },
      {
        id: 8,
        title: "The Seven Husbands",
        author: "Taylor Jenkins Reid",
        cover: "/book8.jpg",
        rating: 4.4,
      },
      {
        id: 9,
        title: "Verity",
        author: "Colleen Hoover",
        cover: "/book9.jpg",
        rating: 4.6,
      },
      {
        id: 10,
        title: "The Paris Apartment",
        author: "Lucy Foley",
        cover: "/book10.jpg",
        rating: 4.1,
      },
    ],
  });

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const ScrollableBookList = ({ title, books }) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar">
          {books.map((book) => (
            <div key={book.id} className="flex-none w-48">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200">
                  <img
                    src="/api/placeholder/200/300"
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-1 truncate">
                    {book.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {book.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Hello, {user.name}!</h1>
              <p className="mt-1 text-purple-100">{getCurrentDate()}</p>
            </div>
            <div className="hidden sm:block">
              <img
                src="/api/placeholder/48/48"
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Books Issued
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {user.booksIssued}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Fine</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              ${user.totalFine}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Books Returned
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {user.returnedBooks}
            </p>
          </div>
        </div>
      </div>

      {/* Book Collections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollableBookList
          title="Best Choice For You"
          books={collections.bestChoice}
        />
        <ScrollableBookList title="Trending Now" books={collections.trending} />
      </div>
    </div>
  );
};

export default UserDashboard;
