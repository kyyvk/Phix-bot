console.log("✅ READY TRIGGERED");
const { startScheduler } = require('../utils/scheduler');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Bot online sebagai ${client.user.tag}`);

    // START SCHEDULER
    startScheduler(client);
  }
};