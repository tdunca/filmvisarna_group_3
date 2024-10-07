import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    seats: [{
        seat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seat'
        },
        isBooked: {
            type: Boolean,
            default: false
        }
    }]
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

export default Showtime;