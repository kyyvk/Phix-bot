const { startScheduler } = require('../core/services/scheduler')

module.exports = {
  name: 'clientReady',
  once: true,
  execute(client) {
    console.log(`✅ Bot online sebagai ${client.user.tag}`);
    startScheduler(client);
  }
};