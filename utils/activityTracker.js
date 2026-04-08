const fs = require('fs');
const path = './activity.json';

function load() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(path));
}

function save(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function track(userId) {
  const data = load();

  if (!data[userId]) data[userId] = 0;

  data[userId] += 1;

  save(data);
}

function getTopUser() {
  const data = load();

  let topUser = null;
  let max = 0;

  for (const user in data) {
    if (data[user] > max) {
      max = data[user];
      topUser = user;
    }
  }

  return topUser;
}

function reset() {
  save({});
}

module.exports = { track, getTopUser, reset };