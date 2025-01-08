import express from "express";
import {
  loggoutUser,
  loginUser,
  registerUser,
  deleteUserByEmail,
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", loggoutUser);
router.post("/delete", deleteUserByEmail);
export default router;
