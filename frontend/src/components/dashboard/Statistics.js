import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Statistics = () => {
  const data = [
    { month: "Jan", visitors: 65, borrowers: 40 },
    { month: "Feb", visitors: 75, borrowers: 45 },
    { month: "Mar", visitors: 85, borrowers: 55 },
    { month: "Apr", visitors: 70, borrowers: 35 },
    { month: "May", visitors: 90, borrowers: 60 },
    { month: "Jun", visitors: 95, borrowers: 65 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Visitors & Borrowers Statistics
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visitors" stroke="#3B82F6" />
            <Line type="monotone" dataKey="borrowers" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
