import { Book } from "../models/book.model.js";
import { IssuedBook } from "../models/issuedBook.model.js";
import { SettledOrder } from "../models/settleOrder.model.js";
import { User } from "../models/user.model.js";
import { config } from "dotenv";
import dotenvPath from "../../dotenvPath.js"; //change the path to yours and not forget extension .js since you are using es6

config({ path: dotenvPath });

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
const S3 = new S3Client({
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_LOCATION,
});

export const addBook = async (req, res) => {
  try {
    const {
      title,
      genre,
      price,
      desc,
      author,
      publisher,
      quantity = 0,
    } = req.body;
    console.log(price, desc, author, publisher, quantity, title, genre);
    if (
      !title ||
      !genre ||
      !price ||
      !desc ||
      !author ||
      !publisher ||
      !quantity
    ) {
      throw new Error("All required fields must be provided.");
    }

    const fileName = (byte = 32) => crypto.randomBytes(byte).toString("hex");
    console.log("this is filename", fileName);
    const insertCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      throw new Error(
        `The book titled "${title}" by author "${author}" already exists in the database.`
      );
    }
    await S3.send(insertCommand);
    const newBook = new Book({
      title,
      genre,
      price,
      desc,
      image: req.file.originalname,
      author,
      publisher,
      quantity,
    });

    const savedBook = await newBook.save({ validateBeforeSave: false });
    console.log("new book saved", savedBook._id);
    res.status(200).send({ message: "success", book: savedBook });
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

export const deleteBook = async (req, res) => {
  let { id } = req.body;
  id = req.params.bookId;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: `Book with ID "${id}" not found.` });
    }

    res.status(200).json({
      message: `Book with ID "${id}" has been deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ error: "Failed to delete book." });
  }
};

export const editBook = async (req, res) => {
  const { id } = req.params;
  const bookData = req.body;

  try {
    if (!bookData) {
      return res
        .status(400)
        .json({ error: "No data provided for updating the book." });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: `Book with ID "${id}" not found.` });
    }

    res.status(200).json({
      message: `Book with ID "${id}" has been updated successfully.`,
      updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ error: "Failed to update book." });
  }
};

export const issueBook = async (req, res) => {
  try {
    const { userId, bookId, timePeriod } = req.body;

    if (!userId || !bookId || !timePeriod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }

    const issuedBook = new IssuedBook({
      userId,
      bookId,
      timePeriod,
    });

    await issuedBook.save().then(async () => {
      book.quantity -= 1;
      await book.save();
      book.borrowList.push(user._id);
      await Book.findByIdAndUpdate(bookId, book, {
        new: true,
        runValidators: false,
      });
      res.status(201).json({
        message: "Book issued successfully",
        issuedBook,
      });
    });
  } catch (error) {
    console.error("Error issuing book:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const settleOrder = async (req, res) => {
  try {
    const { userName, bookId } = req.body;
    const returnedDate = new Date();
    if (!userName || !bookId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    const issuedBook = await IssuedBook.findOne({ userId, bookId });

    if (!issuedBook) {
      return res.status(404).json({ message: "No such issued book found" });
    }

    const issuedDate = issuedBook.issuingDate;

    const overdueDays =
      Math.floor(
        (new Date(returnedDate) - new Date(issuedDate)) / (1000 * 60 * 60 * 24)
      ) - issuedBook.timePeriod;

    let fine = 0;
    if (overdueDays > 0) {
      fine = 5 * overdueDays; // 5 rs fine per day
    }

    const totalAmount = issuedBook.timePeriod * 100 + fine; // Base price is 100 per month

    const settledOrder = new SettledOrder({
      userId,
      bookId,
      issuedDate,
      returnedDate,
      fine,
      totalAmount,
    });

    await settledOrder.save();

    await IssuedBook.deleteOne({ userId, bookId });

    const book = await Book.findById(bookId);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.status(200).json({
      message: "Book returned and order settled successfully",
      settledOrder,
    });
  } catch (error) {
    console.error("Error settling the order:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
