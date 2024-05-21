import express from 'express';
import mongoose from 'mongoose';
import roomsRouter from '../DiplomaWork/Back/Routes/api.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
const secretKey = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

app.get('/generateToken', (req, res) => {
    const participant = {
        id: 1,
        username: 'Andrii'
    };

    const token = jwt.sign(participant, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

app.get('/verifyToken', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Token is required');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        res.json({ decoded });
    });
});

// Підключення до MongoDB
// mongoose.connect('mongodb://localhost:27017/DB', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use('/api', roomsRouter);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
