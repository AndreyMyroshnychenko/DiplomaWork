const express = require('express');
const mongoose = require('mongoose');
const roomsRouter = require('../DiplomaWork/Back/Routes/api');

const app = express();
app.use(express.json());

//mongoose.connect('mongodb://localhost:27017/DB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use('/api', roomsRouter);

app.listen(3000, () => console.log('Server started'));
