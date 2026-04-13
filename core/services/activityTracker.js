let activity = {};

function markActive(userId) {
  if (!activity[userId]) activity[userId] = 0;
  activity[userId]++;
}

module.exports = { markActive };