import express from 'express';
import Room from '../Models/Room.js';
import Booking from '../Models/Booking.js';
import Rating from '../Models/Rating.js';

const router = express.Router();

// Get all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find().populate('ratings');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

// Book a room
router.post('/book', async (req, res) => {
    const { participantId, roomId, start, end } = req.body;

    try {
        const booking = new Booking({ participant: participantId, room: roomId, start, end });
        await booking.save();

        const room = await Room.findById(roomId);
        room.bookings.push({ start, end });
        await room.save();

        res.status(201).json({ message: 'Room booked successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to book room' });
    }
});

// Rate a room
router.post('/rate', async (req, res) => {
    const { participantId, roomId, rating, comment } = req.body;

    try {
        const newRating = new Rating({ participant: participantId, room: roomId, rating, comment });
        await newRating.save();

        const room = await Room.findById(roomId);
        room.ratings.push(newRating._id);
        await room.save();

        res.status(201).json({ message: 'Room rated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to rate room' });
    }
});

export default router;
