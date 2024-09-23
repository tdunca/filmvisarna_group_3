import express from 'express';
import Movie from '../models/Movie.js';
import Hall from '../models/Hall.js';
import Booking from '../models/Booking.js';
import { authUser } from '../middlewares/authUser.js';
import Seat from '../models/Seat.js';
const userRouter = express.Router();

// book a ticket
userRouter.post('/book-ticket', authUser, async (req, res) => {
    try {
      const { movieId, hallId, showtime, seats } = req.body;
      // find the movie with the given id, hall id, and that has the given showtime in its showtimes array
      const movie = await Movie.findOne({ _id: movieId, hall: hallId, showtimes: showtime });
      if (!movie) {
        return res.status(400).json({ error: 'Movie does not exist' });
      }
      const hall = await Hall.findById(hallId);
      if (!hall) {
        return res.status(400).json({ error: 'Hall does not exist' });
      }
        // check if the seats are available
        for (let i = 0; i < seats.length; i++) {
            const seat = await Seat.findById(seats[i]);
            if (!seat) {
                return res.status(400).json({ error: 'Seat does not exist' });
            }
            if (seat.isBooked) {
                return res.status(400).json({ error: 'Seat is already booked' });
            } 
        }
      // create a unique booking number for the ticket includes random letters and numbers and must be exactly 6 characters long
      const bookingNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
      const booking = new Booking({
        user: req.user._id,
        movie: movieId,
        hall: hallId,
        showtime,
        seats,
        bookingNumber,
      });
      await booking.save();
        // update the seats to be booked
        for (let i = 0; i < seats.length; i++) {
            const seat = await Seat.findById(seats[i]);
            if (!seat) {
                return res.status(400).json({ error: 'Seat does not exist' });
            }
            seat.isBooked = true;
            await seat.save();
            }
      res.status(200).json({ message: 'Ticket booked successfully', booking });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

export default userRouter;