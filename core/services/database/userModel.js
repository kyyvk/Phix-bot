const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  chat: { type: Number, default: 0 },
  shared: { type: Boolean, default: false },
  lastActive: Date,
});

module.exports = mongoose.model('User', userSchema);