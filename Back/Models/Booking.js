const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  confirmed: { type: Boolean, default: false },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
