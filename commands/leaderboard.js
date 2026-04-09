const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Top user di Phix'),

  async execute(interaction) {
    if (!fs.existsSync('./database.json')) {
      return interaction.reply('Belum ada data.');
    }

    const data = JSON.parse(fs.readFileSync('./database.json'));

    const sorted = Object.entries(data)
      .sort((a, b) => b[1].xp - a[1].xp)
      .slice(0, 5);

    const medals = ['🥇', '🥈', '🥉'];

    let text = '🏆 **Leaderboard Phix**\n\n';

    sorted.forEach(([userId, userData], index) => {
      const medal = medals[index] || '🏅';
      text += `${medal} <@${userId}> — Level ${userData.level} (${userData.xp} XP)\n`;
    });

    await interaction.reply(text);
  }
};