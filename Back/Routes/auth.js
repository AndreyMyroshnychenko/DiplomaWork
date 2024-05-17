import { Router } from 'express';
import Participant from '../Models/Participant';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/register', async (req, res) => {
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
    const isMatch = await participant.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    //jwt should be here
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/logout', async (req, res) => {
  //logout should be here
});

export default router;