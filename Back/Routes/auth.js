import { Router } from 'express';
import Participant from '../Models/Participant';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const secretKey = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newParticipant = new Participant({ name, email, password: hashedPassword });
    await newParticipant.save();
    res.status(201).json({ message: 'Participant registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const participant = await Participant.findOne({ email });
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    const isMatch = await bcrypt.compare(password, participant.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Створення JWT токену
    const token = jwt.sign({ id: participant._id, email: participant.email }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware для захисту маршрутів
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

export { authMiddleware };
export default router;
