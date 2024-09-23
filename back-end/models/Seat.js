import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;