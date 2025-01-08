import { useNavigate } from "react-router-dom";

const BooksList = () => {
  const books = [
    {
      id: 1,
      title: "The Design of Everyday Things",
      author: "Don Norman",
      status: "Available",
    },
    { id: 2, title: "Lean UX", author: "Jeff Gothelf", status: "Borrowed" },
    { id: 3, title: "The Republic", author: "Plato", status: "Available" },
    {
      id: 4,
      title: "Ancestor Trouble",
      author: "Maud Newton",
      status: "Borrowed",
    },
  ];

  const navigate = useNavigate();
  const handleClick = async () => {
    navigate("/book/addNewBook");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Books List</h2>
        <button
          onClick={handleClick}
          className="text-blue-500 hover:text-blue-600"
        >
          Add New Book
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-3">Title</th>
              <th className="text-left py-3">Author</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b dark:border-gray-700">
                <td className="py-3">{book.title}</td>
                <td className="py-3">{book.author}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      book.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
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
export default BooksList;
