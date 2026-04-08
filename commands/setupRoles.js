const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-roles')
    .setDescription('Setup role button'),

  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('gamer')
        .setLabel('🎮 Gamer')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('creative')
        .setLabel('🎨 Creative')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('learner')
        .setLabel('🧠 Learner')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      content: '🎭 **Choose Your Role**\nKlik tombol di bawah 👇',
      components: [row]
    });
  }
};