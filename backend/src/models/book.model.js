import mongoose from "mongoose";
import { User } from "./user.model.js";
const itemSchema = new mongoose.Schema({
  genre: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  borrowList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export const Book = mongoose.model("Book", itemSchema);
