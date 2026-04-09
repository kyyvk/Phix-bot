const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Lihat progress kamu di Phix'),

  async execute(interaction) {
    const userId = interaction.user.id;

    // XP DATA
    let xpData = {};
    if (fs.existsSync('./database.json')) {
      xpData = JSON.parse(fs.readFileSync('./database.json'));
    }

    const userXP = xpData[userId] || { xp: 0, level: 0 };

    // PROGRESS DATA
    let progressData = {};
    if (fs.existsSync('./progress.json')) {
      progressData = JSON.parse(fs.readFileSync('./progress.json'));
    }

    const progress = progressData[userId] || {
      chat: 0,
      shared: false
    };

    await interaction.reply({
      content:
`👤 **Profile ${interaction.user.username}**

🔥 Level: ${userXP.level}
✨ XP: ${userXP.xp}

💬 Chat: ${progress.chat}
📤 Sudah Share: ${progress.shared ? '✅' : '❌'}

🚀 Keep growing di Phix!`,
      ephemeral: true
    });
  }
};