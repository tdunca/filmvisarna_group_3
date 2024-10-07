import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { resetPassword, userLogin, userLogout, userRegister } from "../controllers/authController.js";

const router = express.Router();

// http://localhost:5000/api/auth/logout
// http://localhost:5000/api/auth/register
// http://localhost:5000/api/auth/login

// register a new user
router.post("/register", userRegister);

// login a user
router.post("/login", userLogin);

// logout a user
router.post("/logout", userLogout);

// reset password
router.post("/reset-password", resetPassword)

export default router;
