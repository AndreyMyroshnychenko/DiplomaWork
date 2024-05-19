import { Router } from 'express';
const router = Router();
import { findRooms } from '../Models/Room';
import Booking, { findOne, findById } from '../Models/Booking';
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await findRooms();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// booking business logic
// room is available?
async function checkRoomAvailability(roomId, startTime, endTime) {
  const existingBooking = await findOne({
    room: roomId,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
      { startTime: { $gte: startTime, $lt: endTime } }, 
      { endTime: { $gt: startTime, $lte: endTime } }, 
    ],
  });
  return !existingBooking; 
}

// create booking
router.post('/bookings', async (req, res) => {
  const { room, startTime, endTime} = req.body;

  
  const isRoomAvailable = await checkRoomAvailability(room, startTime, endTime);
  if (!isRoomAvailable) {
    return res.status(400).json({ message: 'Room is not available at the specified time' });
  }

  // new booking
  const booking = new Booking({
    room,
    startTime,
    endTime,
    confirmed: false,
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// booking cancel
router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// (Check-in)
router.put('/bookings/:id/checkin', async (req, res) => {
  try {
    const booking = await findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.confirmed = true;

    const cancelTime = new Date();
    cancelTime.setHours(cancelTime.getHours() + 1); 
    booking.cancelTime = cancelTime;

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

