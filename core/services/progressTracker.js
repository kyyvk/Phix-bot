const fs = require('fs');
const path = require('path');

const PROGRESS_PATH = path.join(__dirname, '../../data/progress.json');

function updateProgress(userId) {
  let data = {};

  if (fs.existsSync(PROGRESS_PATH)) {
    data = JSON.parse(fs.readFileSync(PROGRESS_PATH));
  }

  if (!data[userId]) {
    data[userId] = { chat: 0 };
  }

  data[userId].chat++;

  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(data, null, 2));

  return data[userId];
}

module.exports = { updateProgress };