import mongoose from "mongoose";

const settledOrderSchema = new mongoose.Schema({
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
  issuedDate: {
    type: Date,
    required: true,
  },
  returnedDate: {
    type: Date,
    required: true,
  },
  basePrice: {
    type: Number,
    default: 100, // Base price for one month
  },
  fine: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

export const SettledOrder = mongoose.model("SettledOrder", settledOrderSchema);
