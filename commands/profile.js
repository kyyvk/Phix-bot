const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Lihat progress kamu di Phix'),

  async execute(interaction) {

    const userId = interaction.user.id;

    // =======================
    // XP DATA
    // =======================
    let xpData = {};
    if (fs.existsSync('./data/database.json')) {
      xpData = JSON.parse(fs.readFileSync('./data/database.json'));
    }

    const userXP = xpData[userId] || { xp: 0, level: 0 };

    // =======================
    // PROGRESS DATA
    // =======================
    let progressData = {};
    if (fs.existsSync('./data/progress.json')) {
      progressData = JSON.parse(fs.readFileSync('./data/progress.json'));
    }

    const progress = progressData[userId] || {
      chat: 0,
      shared: false
    };

    // =======================
    // EMBED
    // =======================
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`👤 ${interaction.user.username}`)
      .addFields(
        { name: '🔥 Level', value: `${userXP.level}`, inline: true },
        { name: '✨ XP', value: `${userXP.xp}`, inline: true },
        { name: '💬 Chat', value: `${progress.chat}`, inline: true },
        { name: '📤 Share', value: progress.shared ? '✅ Sudah' : '❌ Belum', inline: true }
      )
      .setFooter({ text: 'Keep growing di Phix 🚀' });

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};