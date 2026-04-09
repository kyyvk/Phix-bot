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

    // Level UP
    if (data.leveledUp) {
  message.channel.send(
    `🔥 ${message.author} naik ke level ${data.level}!`
  );

  const config = require('../config.json');
  const levelRoles = config.levelRoles || {};

  const roleId = levelRoles[data.level];

  if (roleId) {
    const role = message.guild.roles.cache.get(roleId);
    if (role) {
      await message.member.roles.add(role);

      message.channel.send(
        `🎉 ${message.author} mendapatkan role baru: **${role.name}**!`
      );
    }
  }
}

    // ACTIVITY TRACK
    track(userId);

    // MARK ACTIVE (GENERAL)
    if (message.channel.id === config.channels.general) {
      markActive(userId);

    // AUTO PROMOTE NEW
      const config = require('../config.json');

      const memberRole = message.guild.roles.cache.find(r => r.name === "member");
      const newRole = message.guild.roles.cache.find(r => r.name === "new");

      if (progress.chat >= 5 && memberRole && newRole) {
        if (message.member.roles.cache.has(newRole.id)) {
        await message.member.roles.remove(newRole.id);
        await message.member.roles.add(memberRole.id);

      message.channel.send(
      `🎉 ${message.author} sekarang jadi **Member**!`
    );
  }
}

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