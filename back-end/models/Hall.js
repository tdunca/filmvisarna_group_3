import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
    hallNumber: {
        type: Number,
        required: true,
    },
    seats: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        length: 40,
        ref: 'Seat',
    },
}, { timestamps: true });

const Hall = mongoose.model('Hall', hallSchema);

export default Hall;