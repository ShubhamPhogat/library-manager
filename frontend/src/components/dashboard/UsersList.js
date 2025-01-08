import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const users = [
    { id: 1, name: "John Doe", borrowedBooks: 3, subscription: "Premium" },
    { id: 2, name: "Jane Smith", borrowedBooks: 2, subscription: "Basic" },
    { id: 3, name: "Mike Johnson", borrowedBooks: 1, subscription: "Premium" },
    { id: 4, name: "Sarah Wilson", borrowedBooks: 4, subscription: "Basic" },
  ];
  const navigate = useNavigate();
  const goTosignUp = () => {
    navigate("/signUp");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Users List</h2>
        <button
          onClick={goTosignUp}
          className="text-blue-500 hover:text-blue-600"
        >
          Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3">User Name</th>
              <th className="text-left py-3">Borrowed</th>
              <th className="text-left py-3">Subscription</th>
              <th className="text-left py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b dark:border-gray-700">
                <td className="py-3">{user.name}</td>
                <td className="py-3">{user.borrowedBooks}</td>
                <td className="py-3">{user.subscription}</td>
                <td className="py-3">
                  <button className="text-blue-500 hover:text-blue-600">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersList;
