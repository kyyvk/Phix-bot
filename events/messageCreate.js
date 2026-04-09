const { addXP } = require('../utils/xp');
const { markActive } = require('../utils/activityTracker');
const { updateProgress, shouldNudge } = require('../utils/progressTracker');
const config = require('../config.json');

const cooldown = new Map();

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    const userId = message.author.id;

    // =====================
    // ANTI SPAM COOLDOWN
    // =====================
    const now = Date.now();
    const cooldownTime = 5000;

    if (cooldown.has(userId)) {
      const expiration = cooldown.get(userId) + cooldownTime;
      if (now < expiration) return;
    }

    cooldown.set(userId, now);

    // =====================
    // XP SYSTEM
    // =====================
    const data = addXP(userId, 10);

    if (data.leveledUp) {
      message.channel.send(
        `🔥 ${message.author} naik ke level ${data.level}!`
      );

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

    // =====================
    // ACTIVITY TRACKING
    // =====================
    markActive(userId);

    // =====================
    // PROGRESS TRACKING
    // =====================
    const progress = updateProgress(userId, message.channel.id);

    // =====================
    // AUTO PROMOTE NEW → MEMBER
    // =====================
    const memberRole = message.guild.roles.cache.find(r => r.name === "Member");
    const newRole = message.guild.roles.cache.find(r => r.name === "New");

    if (progress.chat >= 5 && memberRole && newRole) {
      if (message.member.roles.cache.has(newRole.id)) {
        await message.member.roles.remove(newRole.id);
        await message.member.roles.add(memberRole.id);

        message.channel.send(
          `🎉 ${message.author} sekarang jadi **Member**!`
        );
      }
    }

    // =====================
    // NUDGE SYSTEM
    // =====================
    if (message.channel.id === config.channels.general) {
      if (shouldNudge(userId)) {
        message.reply(
          '👀 Kamu cukup aktif ngobrol, tapi belum share progress. Coba kirim sesuatu di #share-your-work!'
        );
      }
    }

    // =====================
    // AUTO REACTION
    // =====================
    if (message.channel.id === config.channels.share) {
      await message.react('🔥');
      await message.react('👏');
    }

    if (message.channel.id === config.channels.work) {
      await message.react('💡');
    }

    // =====================
    // SIMPLE MODERATION
    // =====================
    const badWords = ['tolol', 'anjing', 'goblok'];

    if (badWords.some(word => message.content.toLowerCase().includes(word))) {
      message.reply('⚠️ Jaga kata-kata ya di Phix.');
    }
  }
};