const fs = require('fs');
const path = require('path');
const User = require('../database/userModel');

const DB_PATH = path.join(__dirname, '../../data/database.json');

async function addXP(userId, amount) {
  let data = {};

  if (fs.existsSync(DB_PATH)) {
    data = JSON.parse(fs.readFileSync(DB_PATH));
  }

  if (!data[userId]) {
    data[userId] = { xp: 0, level: 0 };
  }

  data[userId].xp += amount;

  const newLevel = Math.floor(0.1 * Math.sqrt(data[userId].xp));
  let leveledUp = false;

  if (newLevel > data[userId].level) {
    data[userId].level = newLevel;
    leveledUp = true;
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  // MongoDB sync
  await User.findOneAndUpdate(
    { userId },
    {
      xp: data[userId].xp,
      level: data[userId].level,
      lastActive: new Date(),
    },
    { upsert: true }
  );

  return { ...data[userId], leveledUp };
}

module.exports = { addXP };