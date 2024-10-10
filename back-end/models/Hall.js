import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
    hallNumber: {
        type: Number,
        required: true,
    },
    hallName: {
        type: String,
        required: true,
    },
    seatsPerRow: {
        type: [Number],
        required: true,
    },
}, { timestamps: true });

const Hall = mongoose.model('Hall', hallSchema);

export default Hall;