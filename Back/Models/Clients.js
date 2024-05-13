const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // Другие поля, которые могут понадобиться
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
