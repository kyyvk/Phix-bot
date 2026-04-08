const { startScheduler } = require('../utils/scheduler');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Bot online: ${client.user.tag}`);
    startScheduler(client);
  }
};