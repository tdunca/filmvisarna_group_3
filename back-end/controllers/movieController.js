import Movie from "../models/Movie.js";
import Hall from "../models/Hall.js";
import Showtime from "../models/Showtime.js";

export const createMovie = async (req, res) => {
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
        showtimes: showtimes.map(st => st.time),
        rating,
        hall: movieHall._id,
      });
      await movie.save();
  
      for (const { date, time } of showtimes) {
        // Create seats for this showtime
        const seatAvailability = movieHall.seats.map(seat => ({
          seat: seat._id,
          isBooked: false
        }));
  
        // Create a showtime document
        const showtime = new Showtime({
          movie: movie._id,
          hall: movieHall._id,
          date: new Date(date), // e.g., "2021-10-10"
          time, // e.g., "14:00"
          seats: seatAvailability // Seats availability for this showtime
        });
  
        await showtime.save();
      }
      res.status(200).json({ message: "Movie created successfully", movie });
    } catch (error) {
      res.status(500).json(error.message );
    }
  }

  export const getMovies = async (req, res) => {
    try {
      const movies = await Movie.find().populate("hall").exec();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  export const getMoviesByDate = async (req, res) => {
    const { selectedDate } = req.query;
  
    try {
      const date = new Date(selectedDate);
  
      // Find showtimes for the selected date
      const showtimes = await Showtime.find({ date })
        .populate('movie') // Populate movie details
        .populate('hall');  // Optionally populate hall details
  
      if (!showtimes.length) {
        return res.status(404).json({ message: 'No movies found for the selected date' });
      }
  
      // Extract unique movies from the showtimes
      const movies = showtimes.map(showtime => showtime.movie);
      // populate the hall for each movie
      await Movie.populate(movies, { path: 'hall' });
      res.json({ movies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  export const getMovieById = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate("hall").exec();
      const showtimes = await Showtime.find({ movie: req.params.id }).populate("hall").select("time").exec();
        console.log(showtimes);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.status(200).json({movie, showtimes});
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  export const deleteMovies = async (req, res) => {
    try {
      await Movie.deleteMany();
      res.status(200).json({ message: "All movies deleted successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }