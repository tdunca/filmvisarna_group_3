import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String, // "The Matrix"
        required: true,
    },
    year: {
        type: Number, // 2021
        required: true,
    },
    showtimes: {
        type: [String], // ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
        required: true,
    },
    hall:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hall',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    actors: {
        type: [String],
        required: true,
        default: [],
    },
    poster: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dkccaruot/image/upload/v1722965887/oyswfgmlb5olqisiazsg.png",
    },
    trailer: {
        type: String,
        required: true,
        default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;