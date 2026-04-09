const fs = require('fs');

function addXP(userId, amount) {
  let data = {};

  if (fs.existsSync('./database.json')) {
    data = JSON.parse(fs.readFileSync('./database.json'));
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

  fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));

  return { ...data[userId], leveledUp };
}

module.exports = { addXP };