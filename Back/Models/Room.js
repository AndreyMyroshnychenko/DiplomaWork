import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    bookings: [{ start: Date, end: Date }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }]
});

export default mongoose.model('Room', roomSchema);
