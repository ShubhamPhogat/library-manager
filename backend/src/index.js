import express from "express";
import dotenv from "dotenv";
import connectDb from "../db/index.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import bookRoutes from "./routes/bookRoute.js";
import infoRouter from "./routes/getInfoRoute.js";
import findConfig from "find-config";
import cors from "cors";

dotenv.config({ path: findConfig("/.env") });
const app = express();
connectDb();
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api", userRoutes);
app.use("/book", bookRoutes);
app.use("/info", infoRouter);
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
