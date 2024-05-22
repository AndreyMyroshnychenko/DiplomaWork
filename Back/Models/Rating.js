import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
});

export default mongoose.model('Rating', ratingSchema);
