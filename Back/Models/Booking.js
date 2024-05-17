import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  startTime: { type: Date, required: true, index: true },
  endTime: { type: Date, required: true, index: true },
  participant: [{ type: Schema.Types.ObjectId, ref: 'Participant' }],
  confirmed: { type: Boolean, default: false },
}, {
  timestamps: true, 
});


bookingSchema.path('endTime').validate(function (value) {
  return value > this.startTime;
}, 'End time must be greater than start time');


bookingSchema.methods.confirm = function () {
  this.confirmed = true;
  return this.save();
};


const Booking = model('Booking', bookingSchema);

export default Booking;
