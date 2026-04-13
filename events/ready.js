const { connectDB } = require('../core/database/db');
const scheduler = require('../core/services/scheduler');

module.exports = {
  name: 'ready',
  once: true,

  async execute(client) {
    console.log('🚀 BOT STARTING...');

    await connectDB();

    console.log(`✅ Bot online sebagai ${client.user.tag}`);

    scheduler(client);

    console.log('🗓️ Scheduler aktif');
  },
};