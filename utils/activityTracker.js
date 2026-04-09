let activity = {};

function markActive(userId) {
  if (!activity[userId]) {
    activity[userId] = 0;
  }

  activity[userId]++;
}

function getTopUser() {
  let topUser = null;
  let max = 0;

  for (const userId in activity) {
    if (activity[userId] > max) {
      max = activity[userId];
      topUser = userId;
    }
  }

  return topUser;
}

function reset() {
  activity = {};
}

module.exports = {
  markActive,
  getTopUser,
  reset
};