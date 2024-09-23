import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
        required: true,
    },
    showtime: {
        type: String,
        required: true,
    },
    seats: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Seat',
        required: true,
    },
    bookingNumber: {
        type: String,
        unique: true, // this means that the booking number must be unique across all bookings
        length : 6, // this means that the booking number must be exactly 6 characters long
        required: true,
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;