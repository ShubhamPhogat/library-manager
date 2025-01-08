import React from "react";
import StatCard from "./Statcard";
import BooksList from "./BookList";
import UsersList from "./UsersList";
import OverdueList from "./OverdueList";
import TopChoices from "./TopChoices";
// import BooksIssued from "./BooksIssued";
import Statistics from "./Statistics";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Hello, Admin!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Visitors"
          value="1223"
          icon="👥"
          trend="+12%"
          color="bg-blue-500"
          index="0"
        />
        <StatCard
          title="Borrowed Books"
          value="740"
          icon="📚"
          trend="+5%"
          color="bg-green-500"
          index="1"
        />
        <StatCard
          title="Overdue Books"
          value="22"
          icon="⚠️"
          trend="-2%"
          color="bg-red-500"
          index="2"
        />
        <StatCard
          title="New Members"
          value="60"
          icon="👤"
          trend="+8%"
          color="bg-purple-500"
          index="3"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UsersList />
        <BooksList />
      </div>

      <div className="mb-8">
        <TopChoices />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverdueList />
        {/* <BooksIssued /> */}
      </div>

      <div className="mt-8">
        <Statistics />
      </div>
    </div>
  );
};

export default Dashboard;
