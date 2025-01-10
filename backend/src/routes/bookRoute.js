import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/auth.verifyAdmin.js";
import {
  addBook,
  deleteBook,
  EditBook,
  issueBook,
  settleOrder,
} from "../controllers/bookController.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const bookrouter = express.Router();

bookrouter.post(
  "/add",

  upload.single("image"),
  addBook
);
bookrouter.put(
  "/edit/:id",

  EditBook
);

bookrouter.delete("/delete/:bookId", deleteBook);
bookrouter.post("/issue", issueBook);
bookrouter.post("/return", settleOrder);

export default bookrouter;
