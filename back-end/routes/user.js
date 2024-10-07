import express from 'express';
import Movie from '../models/Movie.js';
import Hall from '../models/Hall.js';
import Booking from '../models/Booking.js';
import { authUser } from '../middlewares/authUser.js';
import Seat from '../models/Seat.js';
import Showtime from '../models/Showtime.js';
import { bookTicket, getTickets, getUserInfo, removeTicket, userInfoByTicket } from '../controllers/userController.js';
const userRouter = express.Router();

// book a ticket
userRouter.post('/book-ticket', authUser, bookTicket);

// remove a ticket by booking number
userRouter.delete('/remove-ticket/:bookingNumber', authUser, removeTicket);

// get all tickets of a user
// /api/user/tickets
userRouter.get('/tickets', authUser, getTickets);

// get user info by ticket booking number 
// /api/user/ticket/:bookingNumber
userRouter.get('/ticket/:bookingNumber', authUser, userInfoByTicket);

userRouter.get("/info", authUser, getUserInfo);
export default userRouter;