import Hall from "../models/Hall.js";
import express from "express";
import Seat from "../models/Seat.js";
const hallrouter = express.Router();

// Create a new hall
hallrouter.post("/", async (req, res) => {
  try {
    const { hallNumber, seatQuantity } = req.body;
    const hallExists = await Hall.findOne({ hallNumber });
    if (hallExists) {
      return res.status(400).json({ error: "Hall already exists" });
    }
    if (seatQuantity > 40) {
      return res.status(400).json({ error: "Seat quantity exceeds limit" });
    }
    if (!hallNumber || !seatQuantity) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const hallSeats = [];
    for (let i = 0; i < seatQuantity; i++) {
      const seat = new Seat({ seatNumber: `H${hallNumber}S${ i + 1 }` });
      await seat.save();
      hallSeats.push(seat._id);
    }
    const hall = new Hall({ hallNumber, seats: hallSeats });
    await hall.save();
    res.status(200).json({ message: "Hall created successfully", hall });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default hallrouter;