import Movie from "../models/Movie.js";
// import Hall from "../models/Hall.js";
// import Showtime from "../models/Showtime.js";

export const createMovie = async (req, res) => {
    try {
    const { title, year, length, description, genre, distributor, language, subtitles, productionCountries, director, actors, poster, trailer } = req.body;

    const movie = new Movie({
      title,
      year,
      length,
      description,
      genre,
      distributor,
      language,
      subtitles,
      productionCountries,
      director,
      actors,
      poster,
      trailer
    });

    await movie.save();
    res.status(200).json({ message: "Movie created successfully", movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().exec();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Not needed anymore since showtimes and hall is not included in movie object
  // export const getMoviesByDate = async (req, res) => {
  //   const { selectedDate } = req.query;
  
  //   try {
  //     const date = new Date(selectedDate);
  
  //     // Find showtimes for the selected date
  //     const showtimes = await Showtime.find({ date })
  //       .populate('movie') // Populate movie details
  //       .populate('hall');  // Optionally populate hall details
  
  //     if (!showtimes.length) {
  //       return res.status(404).json({ message: 'No movies found for the selected date' });
  //     }
  
  //     // Extract unique movies from the showtimes
  //     const movies = showtimes.map(showtime => showtime.movie);
  //     // populate the hall for each movie
  //     await Movie.populate(movies, { path: 'hall' });
  //     res.json({ movies });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Server error' });
  //   }
  // }

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).exec();
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteMovies = async (req, res) => {
  try {
    await Movie.deleteMany();
    res.status(200).json({ message: "All movies deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
