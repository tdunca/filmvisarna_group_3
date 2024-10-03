import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;