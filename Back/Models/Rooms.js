import { Schema, model } from 'mongoose';

const roomsSchema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  equipment: [{ type: String }],
  available: { type: Boolean, default: true },
});

const Rooms = model('Rooms', roomsSchema);
async function findRooms() {
  try {
    const rooms = await Rooms.find();
    return rooms;
  } catch (err) {
    throw new Error('Error fetching rooms from database');
  }
}

export default Rooms;
export { findRooms };

