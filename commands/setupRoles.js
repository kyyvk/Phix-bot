const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-roles')
    .setDescription('Setup role panel'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🎭 Choose Your Role')
      .setDescription('Pilih 1 role utama kamu 👇');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('role_gamer').setLabel('🎮 Gamer').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('role_creative').setLabel('🎨 Creative').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('role_learner').setLabel('🧠 Learner').setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};