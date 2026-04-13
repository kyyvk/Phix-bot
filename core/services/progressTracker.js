const fs = require('fs');
const path = require('path');
const config = require('../../config.json');

const PROGRESS_PATH = path.join(__dirname, '../../data/progress.json');

function updateProgress(userId, channelId) {
  let data = {};

  if (fs.existsSync(PROGRESS_PATH)) {
    data = JSON.parse(fs.readFileSync(PROGRESS_PATH));
  }

  if (!data[userId]) {
    data[userId] = { chat: 0, shared: false, nudged: false };
  }

  if (channelId === config.channels.general) {
    data[userId].chat++;
  }

  if (channelId === config.channels.share) {
    data[userId].shared = true;
  }

  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(data, null, 2));

  return data[userId];
}

function shouldNudge(userId) {
  let data = {};

  if (!fs.existsSync(PROGRESS_PATH)) return false;

  data = JSON.parse(fs.readFileSync(PROGRESS_PATH));

  if (!data[userId]) return false;

  if (data[userId].chat >= 5 && !data[userId].shared && !data[userId].nudged) {
    data[userId].nudged = true;
    fs.writeFileSync(PROGRESS_PATH, JSON.stringify(data, null, 2));
    return true;
  }

  return false;
}

module.exports = { updateProgress, shouldNudge };