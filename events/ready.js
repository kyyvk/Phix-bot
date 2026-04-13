require('dotenv').config();

const { connectDB } = require('../core/database/db');
const scheduler = require('../core/services/scheduler');

module.exports = {
  name: 'ready',
  once: true,

  async execute(client) {
    try {
      console.log('🚀 BOT STARTING...');

      // 🔌 Connect ke MongoDB
      await connectDB();

      console.log(`✅ Bot online sebagai ${client.user.tag}`);

      // 🔁 Jalankan scheduler
      scheduler(client);

      console.log('🗓️ Scheduler aktif');

    } catch (error) {
      console.error('❌ Error di ready event:', error);
    }
  },
};