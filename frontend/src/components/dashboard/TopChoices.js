import axios from "axios";
import { useEffect, useState } from "react";

const TopChoices = () => {
  const [books, setBooks] = useState([]);
  // const topBooks = [
  //   {
  //     id: 1,
  //     title: "The Design of Everyday Things",
  //     author: "Don Norman",
  //     cover: "/covers/design.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Lean UX",
  //     author: "Jeff Gothelf",
  //     cover: "/covers/lean.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "The Republic",
  //     author: "Plato",
  //     cover: "/covers/republic.jpg",
  //   },
  //   {
  //     id: 4,
  //     title: "Ancestor Trouble",
  //     author: "Maud Newton",
  //     cover: "/covers/ancestor.jpg",
  //   },
  // ];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/info/books`
      );
      const data = response;

      setBooks(data.data.allBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Top Choices</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {books.map((book) => (
          <div key={book._id} className="flex flex-col items-center">
            <img
              src={book.url}
              alt={book.title}
              className="rounded-lg shadow-md mb-2 w-full h-48 object-cover"
            />
            <h3 className="text-sm font-medium text-center">{book.title}</h3>
            <p className="text-xs text-gray-500 text-center">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChoices;
