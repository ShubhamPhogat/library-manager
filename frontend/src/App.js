import { useState } from "react";
import "./App.css";
import Signup from "./auth/Signup";
import Log from "./auth/Log";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Main from "./pages/Main";
import BookUploadForm from "./components/books/BookUploadForm";
import OverdueBooksList from "./components/books/OverdueBooksList";
import BookList from "./components/books/BookList";
import EditBook from "./components/books/EditBook";
import UserList from "./components/user/UserList";

function App() {
  const [login, setLogin] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Log />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/book/addNewBook" element={<BookUploadForm />} />
        <Route path="/book/overdueBook" element={<OverdueBooksList />} />
        <Route path="/book/list" element={<BookList />} />
        <Route path="/book/edit" element={<EditBook />} />
        <Route path="/user/list" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
