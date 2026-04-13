const { addXP } = require('../core/services/xp');
const { markActive } = require('../core/services/activityTracker');
const { updateProgress, shouldNudge } = require('../core/services/progressTracker');
const config = require('../config.json');

const cooldown = new Map();

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (!message.guild || message.author.bot) return;

    const userId = message.author.id;

    // COOLDOWN
    const now = Date.now();
    if (cooldown.has(userId)) {
      if (now < cooldown.get(userId)) return;
    }
    cooldown.set(userId, now + 5000);

    // XP
    const data = addXP(userId, 10);

    if (data.leveledUp) {
      message.channel.send(`🔥 ${message.author} naik ke level ${data.level}!`);
    }

    // ACTIVITY
    markActive(userId);

    // PROGRESS
    const progress = updateProgress(userId, message.channel.id);

    if (!progress || !message.member) return;

    // AUTO PROMOTE
    const memberRole = message.guild.roles.cache.find(r => r.name === "member");
    const newRole = message.guild.roles.cache.find(r => r.name === "new");

    if (progress.chat >= 5 && memberRole && newRole) {
      if (message.member.roles.cache.has(newRole.id)) {
        await message.member.roles.remove(newRole.id);
        await message.member.roles.add(memberRole.id);

        message.channel.send(`🎉 ${message.author} sekarang jadi **member**!`);
      }
    }

    // NUDGE
    if (message.channel.id === config.channels.general) {
      if (shouldNudge(userId)) {
        message.reply("👀 Kamu aktif, tapi belum share karya!");
      }
    }

    // REACTION
    if (message.channel.id === config.channels.share) {
      await message.react('🔥');
      await message.react('👏');
    }

    // MODERATION
    const badWords = ['tolol', 'anjing', 'goblok'];
    if (badWords.some(w => message.content.toLowerCase().includes(w))) {
      message.reply("⚠️ Jaga kata-kata ya.");
    }
  }
};