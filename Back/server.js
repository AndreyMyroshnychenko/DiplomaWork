import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './Routes/auth.js';
import apiRoutes from './Routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/roomBooking', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('Failed to connect to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Serve static files from the "Front" directory
app.use(express.static(path.join(path.resolve(), 'Front')));

// Handle the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'Front', 'html', 'mainPage.html'));
});

// Handle other HTML files
app.get('/:filename', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'Front', 'html', req.params.filename));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
