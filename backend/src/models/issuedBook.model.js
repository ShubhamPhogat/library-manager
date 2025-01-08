import mongoose from "mongoose";
import { Book } from "./book.model.js";
import { User } from "./user.model.js";

const issuedBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  issuingDate: {
    type: Date,
    default: Date.now,
  },
  timePeriod: {
    type: Number,
    required: true,
  },
});

export const IssuedBook = mongoose.model("IssuedBook", issuedBookSchema);
