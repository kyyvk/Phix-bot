const { addXP } = require('../utils/xp');
const { track } = require('../utils/activityTracker');
const {
  markActive,
  markShared,
  shouldNudge,
  markNudged
} = require('../utils/progressTracker');

const config = require('../config.json');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    const userId = message.author.id;

    // XP
    const data = await addXP(userId);

    if (data.leveledUp) {
      message.channel.send(
        `🔥 ${message.author} naik ke level ${data.level}!`
      );
    }

    // ACTIVITY TRACK
    track(userId);

    // MARK ACTIVE (GENERAL)
    if (message.channel.id === config.channels.general) {
      markActive(userId);

      // CHECK NUDGE
      if (shouldNudge(userId)) {
        message.reply(
          `👀 Kamu cukup aktif ngobrol, tapi belum share progress.\n\nCoba mulai di channel yang sesuai ya — Phix bukan cuma ngobrol 👇`
        );

        markNudged(userId);
      }
    }

    // MARK SHARED
    if (
      message.channel.id === config.channels.share ||
      message.channel.id === config.channels.work
    ) {
      markShared(userId);
    }

    // SMART REACTION
    if (message.channel.id === config.channels.share) {
      await message.react('🔥');
      await message.react('👏');
    }

    if (message.channel.id === config.channels.work) {
      await message.react('💡');
    }

    // MODERATION
    const badWords = ['tolol', 'anjing', 'goblok'];

    if (badWords.some(word => message.content.toLowerCase().includes(word))) {
      message.reply('⚠️ Jaga kata-kata ya di Phix.');
    }
  }
};