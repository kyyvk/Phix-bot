const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/database.json');
const progressPath = path.join(__dirname, '../data/progress.json');

function readJSON(filePath) {
  try {
    if (!fs.existsSync(filePath)) return {};
    const data = fs.readFileSync(filePath, 'utf-8');
    if (!data) return {};
    return JSON.parse(data);
  } catch (err) {
    console.error('JSON ERROR:', err);
    return {};
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Lihat progress kamu di Phix'),

  async execute(interaction) {
    const userId = interaction.user.id;

    const xpData = readJSON(dbPath);
    const progressData = readJSON(progressPath);

    const userXP = xpData[userId] || { xp: 0, level: 0 };
    const progress = progressData[userId] || {
      chat: 0,
      shared: false
    };

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

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};