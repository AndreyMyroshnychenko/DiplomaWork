import { Schema, model } from 'mongoose';

const ratingSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  rating: { type: Number, required: true }
});

const Rating = model('Rating', ratingSchema);

export default Rating;
