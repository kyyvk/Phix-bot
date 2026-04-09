const cron = require('node-cron');
const config = require('../config.json');
const { getTopUser, reset } = require('./activityTracker');

function startScheduler(client) {
  console.log("⏱️ Scheduler aktif");

  cron.schedule('0 21 * * *', () => {
    const channel = client.channels.cache.get(config.channels.general);
    const topUser = getTopUser();

    if (channel && topUser) {
      channel.send(`🏆 Top user hari ini: <@${topUser}>`);
    }

    reset();
  });
}

module.exports = { startScheduler };