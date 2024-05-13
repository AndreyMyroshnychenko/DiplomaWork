const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  // Другие поля, которые могут понадобиться
});

const Rooms = mongoose.model('Rooms', roomSchema);

module.exports = Rooms;
