import React, { useState } from "react";

const OverdueBooksList = () => {
  // Sample data - replace with your actual data
  const [overdueBooks, setOverdueBooks] = useState([
    {
      id: 1,
      user: {
        username: "john_doe",
        email: "john@example.com",
        notified: false,
      },
      book: {
        title: "The Great Gatsby",
        publisher: "Scribner",
        dueDate: "2024-01-01",
      },
    },
    {
      id: 2,
      user: {
        username: "sarah_smith",
        email: "sarah@example.com",
        notified: true,
      },
      book: {
        title: "To Kill a Mockingbird",
        publisher: "J.B. Lippincott & Co.",
        dueDate: "2024-01-03",
      },
    },
    
  ]);

  

  const handleNotify = (userId) => {
    setOverdueBooks((prev) =>
      prev.map((item) =>
        item.id === userId
          ? { ...item, user: { ...item.user, notified: true } }
          : item
      )
    );
    // Here you would typically make an API call to send the notification
  };

  const getDaysOverdue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = Math.abs(today - due);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-purple-600">Overdue Books</h2>
          <p className="text-gray-500 mt-2">
            Users with overdue books and their details
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Overdue
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {overdueBooks.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Notifications Sent
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {overdueBooks.filter((item) => item.user.notified).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Pending Notifications
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {overdueBooks.filter((item) => !item.user.notified).length}
            </p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            {overdueBooks.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6">
                  {/* User Info */}
                  <div className="mb-4 md:mb-0 md:w-1/3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.user.username}
                    </h3>
                    <p className="text-gray-500">{item.user.email}</p>
                  </div>

                  {/* Book Info */}
                  <div className="mb-4 md:mb-0 md:w-1/3">
                    <div className="space-y-1">
                      <h4 className="font-medium text-gray-900">
                        {item.book.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.book.publisher}
                      </p>
                      <p className="text-sm font-medium text-red-600">
                        {getDaysOverdue(item.book.dueDate)} days overdue
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="md:w-1/3 flex justify-end">
                    <button
                      onClick={() => handleNotify(item.id)}
                      disabled={item.user.notified}
                      className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
                        item.user.notified
                          ? "bg-green-100 text-green-700 cursor-default"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {item.user.notified ? (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Notified</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                          <span>Send Notification</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueBooksList;
