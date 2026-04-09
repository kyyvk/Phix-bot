const fs = require('fs');
const config = require('../config.json');

function updateProgress(userId, channelId) {
  let data = {};

  if (fs.existsSync('./progress.json')) {
    data = JSON.parse(fs.readFileSync('./progress.json'));
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

  fs.writeFileSync('./progress.json', JSON.stringify(data, null, 2));

  return data[userId];
}

function shouldNudge(userId) {
  let data = {};

  if (!fs.existsSync('./progress.json')) return false;

  data = JSON.parse(fs.readFileSync('./progress.json'));

  if (!data[userId]) return false;

  if (data[userId].chat >= 5 && !data[userId].shared && !data[userId].nudged) {
    data[userId].nudged = true;
    fs.writeFileSync('./progress.json', JSON.stringify(data, null, 2));
    return true;
  }

  return false;
}

module.exports = { updateProgress, shouldNudge };