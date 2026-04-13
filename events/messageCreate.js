const { addXP } = require('../core/services/xp');
const { markActive } = require('../core/services/activityTracker');
const { updateProgress } = require('../core/services/progressTracker');

module.exports = {
  name: 'messageCreate',

  async execute(message) {
    if (!message.guild || message.author.bot) return;

    const userId = message.author.id;

    markActive(userId);

    const result = await addXP(userId, 10);

    updateProgress(userId);

    if (result.leveledUp) {
      message.reply(`🎉 Level up! Kamu sekarang level ${result.level}`);
    }
  },
};