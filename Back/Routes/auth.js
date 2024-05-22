import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Participant from '../Models/Participant.js';

const router = express.Router();

// Registration
router.post('/signup.html', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const participant = new Participant({ name, email, password: hashedPassword });
        await participant.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to register user' });
    }
});

// Login
router.post('/login.html', async (req, res) => {
    const { email, password } = req.body;

    try {
        const participant = await Participant.findOne({ email });
        if (!participant || !await bcrypt.compare(password, participant.password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: participant._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Failed to login' });
    }
});

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized access' });
    }
};

// Protected route example
router.get('/protectedRoute', authenticateUser, (req, res) => {
    res.json({ message: 'Access granted to protected route' });
});

export default router;
