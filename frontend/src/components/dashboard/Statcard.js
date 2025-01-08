import axios from "axios";
import { useEffect, useState } from "react";

const StatCard = ({ title, value, icon, trend, color, index }) => {
  // console.log(typeof title);
  const [count, setCount] = useState(0);

  const getUsersCount = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/user/count`
      );

      setCount(res.data.count);
    } catch (error) {
      console.error(error);
    }
  };
  const getBorrowedBooksCount = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/issue/count`
      );
      setCount(res.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const dueCount = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/due/count`
      );
      setCount(res.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let res = 0;
    switch (index) {
      case "2":
        dueCount();
        break;
      case "1":
        getBorrowedBooksCount();
        break;
      case "0":
        getUsersCount();
        break;
      default:
        console.log("Unknown title");
        break;
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{count}</h3>
        </div>
        <div className={`${color} p-3 rounded-full text-white`}>{icon}</div>
      </div>
      <div className="mt-4">
        <span
          className={`text-sm ${
            trend.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend} from last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;
