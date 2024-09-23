import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// http://localhost:5000/api/auth/logout
// http://localhost:5000/api/auth/register
// http://localhost:5000/api/auth/login

// register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    if (!token) {
      return res.status(500).json({ error: "Failed to generate token" });
    }
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
    res.status(500).json({ error: "Server error" });
    }
}   );

// logout a user
router.post("/logout", (req, res) => { 
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: `Server Error ${error.message}` });
        
    }
});

export default router;
