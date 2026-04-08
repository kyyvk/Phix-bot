const fs = require('fs');
const path = './database.json';

function loadData() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(path));
}

function saveData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

async function addXP(userId) {
  const data = loadData();

  if (!data[userId]) {
    data[userId] = { xp: 0, level: 0 };
  }

  const gain = Math.floor(Math.random() * 10) + 5;
  data[userId].xp += gain;

  const newLevel = Math.floor(0.1 * Math.sqrt(data[userId].xp));

  const leveledUp = newLevel > data[userId].level;
  data[userId].level = newLevel;

  saveData(data);

  return {
    xp: data[userId].xp,
    level: data[userId].level,
    leveledUp
  };
}

module.exports = { addXP };