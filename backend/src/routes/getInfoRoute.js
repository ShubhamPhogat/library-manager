import express from "express";

import { verifyAdmin } from "../middlewares/auth.verifyAdmin.js";
import {
  getOverdueBooks,
  getIssuedBooks,
  getAllBooks,
  SearchBook,
  getUsersByInitials,
  getAllusers,
  getUsersCount,
  getBorrowedBooksCount,
  getDueBooksCount,
} from "../controllers/infoController.js";

const infoRouter = express.Router();

infoRouter.get("/dueBooks", getOverdueBooks);
infoRouter.get("/issuedBooks", getIssuedBooks);
infoRouter.get("/books", getAllBooks);
infoRouter.get("/users", getAllusers);
infoRouter.get("/searchBooks/:initials", SearchBook);
infoRouter.get("/searchUsers/:initials", getUsersByInitials);
infoRouter.get("/user/count", getUsersCount);
infoRouter.get("/issue/count", getBorrowedBooksCount);
infoRouter.get("/due/count", getDueBooksCount);

export default infoRouter;
