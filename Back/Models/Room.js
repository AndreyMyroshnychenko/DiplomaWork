import { Schema, model } from 'mongoose';

const roomsSchema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  equipment: [{ type: String }],
  available: { type: Boolean, default: true },
  likes: { type: Number, default: 0 }
});

const Room = model('Rooms', roomsSchema);
async function findRooms() {
  try {
    const rooms = await Room.find();
    return rooms;
  } catch (err) {
    throw new Error('Error fetching rooms from database');
  }
}

export default Room;
export { findRooms };

