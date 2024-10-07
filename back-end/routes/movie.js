import Movie from "../models/Movie.js";
import express from "express";
import Hall from "../models/Hall.js";
import Showtime from "../models/Showtime.js";
import { createMovie, deleteMovies, getMovieById, getMovies, getMoviesByDate } from "../controllers/movieController.js";
const movierouter = express.Router();

// Create a new movie
movierouter.post("/", createMovie);

// Get all movies
// /api/movie
movierouter.get("/", getMovies);

// filter movies by a given date from the request query
// http://localhost:5000/api/movie/movies-by-date?selectedDate=2024-09-22
movierouter.get('/movies-by-date', getMoviesByDate);

// Get a movie by id and populate the hall
// /api/movie/:id
movierouter.get("/:id", getMovieById);

// delete all movies and their showtimes
// /api/movie
movierouter.delete("/", deleteMovies);


export default movierouter;
