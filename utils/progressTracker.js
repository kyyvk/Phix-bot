const fs = require('fs');
const path = './progress.json';

function load() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(path));
}

function save(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function markActive(userId) {
  const data = load();

  if (!data[userId]) {
    data[userId] = {
      chat: 0,
      shared: false,
      nudged: false
    };
  }

  data[userId].chat += 1;

  save(data);
}

function markShared(userId) {
  const data = load();

  if (!data[userId]) {
    data[userId] = {
      chat: 0,
      shared: true,
      nudged: false
    };
  } else {
    data[userId].shared = true;
  }

  save(data);
}

function shouldNudge(userId) {
  const data = load();

  if (!data[userId]) return false;

  return (
    data[userId].chat >= 5 &&
    !data[userId].shared &&
    !data[userId].nudged
  );
}

function markNudged(userId) {
  const data = load();

  if (data[userId]) {
    data[userId].nudged = true;
  }

  save(data);
}

module.exports = {
  markActive,
  markShared,
  shouldNudge,
  markNudged
};