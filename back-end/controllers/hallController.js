import Hall from "../models/Hall.js";
import express from "express";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";

export const createHall = async (req, res) => {
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
  }

export const getHalls = async (req, res) => {
    try {
      const halls = await Hall.find().populate("seats").exec();
      res.status(200).json(halls);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

export const getHallById = async (req, res) => {
    try {
      const hall = await Hall.findById(req.params.id).populate("seats").exec();
      if (!hall) {
        return res.status(404).json({ error: "Hall not found" });
      }
      res.status(200).json(hall);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

  export const getShowtimesOfMovieInHall = async (req, res) => {
    try {
      const { hallId, movieId } = req.params;
      const showtimes = await Showtime.find({ hall: hallId, movie: movieId }).exec();
      res.status(200).json(showtimes);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

export const deleteHalls = async (req, res) => {
    try {
      Promise.all([
        Hall.deleteMany(),
        Seat.deleteMany(),
        Showtime.deleteMany(),
      ]);
      res.status(200).json({ message: "All halls deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

export const getSeatsOfHallAtShowtime = async (req, res) => {
    try {
      const { hallId, showtime } = req.params;
      console.log(hallId, showtime);
      const showtimeDocSeats = await Showtime.findOne({ hall: hallId, time: showtime }).select("seats").exec();
  
      if (!showtimeDocSeats) {
        return res.status(404).json({ error: "Showtime not found" });
      }
  
  
      res.status(200).json(showtimeDocSeats);
    } catch (error) {
      console.error('Error fetching seats:', error); // Log the error for debugging
      res.status(500).json({ error: "Server error" });
    }
  }

  export const getSeatInfo = async (req, res) => {
    try {
      const seat = await Seat.findById(req.params.id).exec();
      if (!seat) {
        return res.status(404).json({ error: "Seat not found" });
      }
      res.status(200).json(seat);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }