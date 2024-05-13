const express = require('express');
const router = express.Router();
const Rooms = require('../Models/Rooms');
const Booking = require('../Models/Booking');
// Endpoint для получения списка доступных комнат
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//check-in here
module.exports = router;


// router.post('/bookings', async (req, res) => {
//     const booking = new Booking({
//       room: req.body.room,
//       startTime: req.body.startTime,
//       endTime: req.body.endTime,
//       participants: req.body.participants,
//       confirmed: false, //by default false
//     });
  
//     try {
//       const newBooking = await booking.save();
//       res.status(201).json(newBooking);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   module.exports = router;

// booking business logic
// room is available?
async function checkRoomAvailability(roomId, startTime, endTime) {
  const existingBooking = await Booking.findOne({
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
  const { room, startTime, endTime, participants } = req.body;

  
  const isRoomAvailable = await checkRoomAvailability(room, startTime, endTime);
  if (!isRoomAvailable) {
    return res.status(400).json({ message: 'Room is not available at the specified time' });
  }

  // new booking
  const booking = new Booking({
    room,
    startTime,
    endTime,
    participants,
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
    const booking = await Booking.findById(req.params.id);
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
    const booking = await Booking.findById(req.params.id);
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

module.exports = router;


// router.delete('/bookings/:id', async (req, res) => {
//     try {
//       await Booking.findByIdAndDelete(req.params.id);
//       res.status(204).send();
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
// });

// // Endpoint confirm booking
// router.put('/bookings/:id/checkin', async (req, res) => {
//     try {
//       const booking = await Booking.findById(req.params.id);
//       if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
//       booking.confirmed = true;
//       // will be time logic here
  
//       await booking.save();
//       res.json(booking);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
// });
  
  