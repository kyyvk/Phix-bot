const cron = require('node-cron');
const config = require('../config.json');
const { getTopUser, reset } = require('./activityTracker');
const fs = require('fs');

function startScheduler(client) {

  // DAILY TOP USER
  cron.schedule('0 21 * * *', async () => {
    const channel = client.channels.cache.get(config.channels.general);
    const topUser = getTopUser();

    if (channel && topUser) {
      channel.send(
        `🏆 Top Contributor Hari Ini: <@${topUser}> 🔥\nTerima kasih sudah aktif hari ini!`
      );
    }

    reset();
  });

  // WEEKLY PROMPT
  cron.schedule('0 20 * * 0', () => {
    const channel = client.channels.cache.get(config.channels.general);

    if (channel) {
      channel.send(
        '🔥 Weekly Check:\nApa progress terbaik kamu minggu ini?'
      );
    }
  });

  // WEEKLY RESET (SENIN)
  cron.schedule('0 0 * * 1', () => {
    fs.writeFileSync('./progress.json', JSON.stringify({}));
    console.log('♻️ Weekly progress reset');
  });
}

module.exports = { startScheduler };