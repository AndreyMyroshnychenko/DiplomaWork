import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true }
});

export default mongoose.model('Booking', bookingSchema);
