import Movie from "../models/Movie.js";
import express from "express";
import Hall from "../models/Hall.js";
const movierouter = express.Router();

// Create a new movie
movierouter.post("/", async (req, res) => {
  try {
    const { title, year, description, rating, hall, showtimes } =
      req.body;
    const movieHall = await Hall.findOne({ hallNumber: hall });
    if (!movieHall) {
      return res.status(400).json({ error: "Hall does not exist" });
    }
    const movie = new Movie({
      title,
      year,
      description,
      showtimes,
      rating,
      hall: movieHall._id,
    });
    await movie.save();
    res.status(200).json({ message: "Movie created successfully", movie });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default movierouter;
