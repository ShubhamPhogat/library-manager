import { useNavigate } from "react-router-dom";

const OverdueList = () => {
  const overdueBooks = [
    {
      id: 1,
      user: "John Doe",
      book: "The Design of Everyday Things",
      dueDate: "2024-01-01",
      fine: 5.0,
    },
    {
      id: 2,
      user: "Jane Smith",
      book: "Lean UX",
      dueDate: "2024-01-03",
      fine: 3.0,
    },
    {
      id: 3,
      user: "Mike Johnson",
      book: "The Republic",
      dueDate: "2024-01-05",
      fine: 2.0,
    },
  ];
  const navigate = useNavigate();
  const handlClick = async () => {
    navigate("/book/overdueBook");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 onClick={handlClick} className="text-xl font-semibold mb-6">
        Overdue Books
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3">User</th>
              <th className="text-left py-3">Book</th>
              <th className="text-left py-3">Due Date</th>
              <th className="text-right py-3">Fine</th>
            </tr>
          </thead>
          <tbody>
            {overdueBooks.map((item) => (
              <tr key={item.id} className="border-b dark:border-gray-700">
                <td className="py-3">{item.user}</td>
                <td className="py-3">{item.book}</td>
                <td className="py-3">
                  {new Date(item.dueDate).toLocaleDateString()}
                </td>
                <td className="py-3 text-right text-red-500">
                  ${item.fine.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverdueList;
