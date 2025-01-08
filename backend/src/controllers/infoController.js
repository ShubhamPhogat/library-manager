import { Book } from "../models/book.model.js";
import { IssuedBook } from "../models/issuedBook.model.js";
import { User } from "../models/user.model.js";
import { config } from "dotenv";
import dotenvPath from "../../dotenvPath.js"; //change the path to yours and not forget extension .js since you are using es6

config({ path: dotenvPath });
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

export const getOverdueBooks = async (req, res) => {
  try {
    const currentDate = new Date();

    const issuedBooks = await IssuedBook.find()
      .populate("bookId")
      .populate("userId");

    if (issuedBooks.length === 0) {
      return res.status(404).json({ message: "No issued books found" });
    }

    const overdueBooks = issuedBooks.filter((issuedBook) => {
      const issuingDate = new Date(issuedBook.issuingDate);
      const deadline = new Date(
        issuingDate.getTime() + issuedBook.timePeriod * 24 * 60 * 60 * 1000
      ); // Adding timePeriod in days
      return currentDate > deadline;
    });

    if (overdueBooks.length === 0) {
      return res.status(404).json({ message: "No overdue books found" });
    }

    const result = overdueBooks.map((book) => ({
      issuingDate: book.issuingDate,
      timePeriod: book.timePeriod,

      bookDetails: {
        title: book.bookId.title,
        author: book.bookId.author,
        genre: book.bookId.genre,
      },
      userDetails: {
        username: book.userId.username,
        email: book.userId.email,
      },
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching overdue books:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.aggregate([
      {
        $group: {
          _id: "$bookId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $project: {
          bookId: "$_id",
          count: 1,
          bookDetails: { $arrayElemAt: ["$bookDetails", 0] }, // Only get the first book details
        },
      },
    ]);

    res.status(200).json(issuedBooks);
  } catch (error) {
    console.error("Error fetching issued books:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    let allBooks = [];
    if (books.length === 0) {
      return res.status(404).send({ message: "No books found." });
    }
    for (let Data of books) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: Data.image,
      });
      const url = await getSignedUrl(S3, command, { expiresIn: 3600 });

      const imageData = { ...Data._doc, url };

      allBooks.push(imageData);
    }

    res
      .status(200)
      .send({ message: "Books retrieved successfully.", allBooks });
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res
      .status(500)
      .send({ message: "Error fetching books.", error: error.message });
  }
};
export const getAllusers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).send({ message: "No users found." });
    }

    res.status(200).send({ message: "users retrieved successfully.", users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .send({ message: "Error fetching books.", error: error.message });
  }
};

export const SearchBook = async (req, res) => {
  try {
    const { initials } = req.params;
    console.log(initials);
    if (!initials) {
      return res.status(400).json({ message: "Initials are required" });
    }

    const books = await Book.find({
      title: { $regex: `^${initials}`, $options: "i" },
    });

    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found with these initials" });
    }
    let filteredBooks = [];
    for (let Data of books) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: Data.image,
      });
      const url = await getSignedUrl(S3, command, { expiresIn: 3600 });

      const imageData = { ...Data._doc, url };

      filteredBooks.push(imageData);
    }

    res.status(200).json({ filteredBooks });
  } catch (error) {
    console.error("Error searching for books:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUsersByInitials = async (req, res) => {
  try {
    const initials = req.params.initials;
    console.log(initials);
    if (!initials) {
      return res.status(400).json({ message: "Initials are required" });
    }

    const users = await User.find({
      firstName: { $regex: `^${initials}`, $options: "i" },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with these initials" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getBorrowedBooksCount = async (req, res) => {
  try {
    const count = await IssuedBook.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching borrowed books count:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get the count of due books
export const getDueBooksCount = async (req, res) => {
  try {
    const currentDate = new Date();
    const issuedBooks = await IssuedBook.find()
      .populate("bookId")
      .populate("userId");

    if (issuedBooks.length > 0) {
      const overdueBooks = issuedBooks.filter((issuedBook) => {
        const issuingDate = new Date(issuedBook.issuingDate);
        const deadline = new Date(
          issuingDate.getTime() + issuedBook.timePeriod * 24 * 60 * 60 * 1000
        ); // Adding timePeriod in days
        return currentDate > deadline;
      });
      res.status(200).json({ count: overdueBooks.length });
    }
  } catch (err) {
    console.error("Error fetching overdue books:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get the count of users
export const getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching users count:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
