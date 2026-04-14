const config = require('../config.json');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    // =======================
    // SLASH COMMAND
    // =======================
    if (interaction.isChatInputCommand()) {

      console.log("📩 Command masuk:", interaction.commandName);

      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return interaction.reply({
          content: '❌ Command tidak ditemukan!',
          ephemeral: true
        });
      }

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: '❌ Error menjalankan command',
            ephemeral: true
          });
        } else {
          await interaction.reply({
            content: '❌ Error menjalankan command',
            ephemeral: true
          });
        }
      }
    }

    // =======================
    // BUTTON ROLE
    // =======================
    if (interaction.isButton()) {
      try {
        const roleMap = config.roles;
        const roleId = roleMap[interaction.customId];

        if (!roleId) return;

        const member = interaction.member;

        if (member.roles.cache.has(roleId)) {
          await member.roles.remove(roleId);
          return interaction.reply({
            content: '❌ Role dilepas',
            ephemeral: true
          });
        }

        await member.roles.add(roleId);

        await interaction.reply({
          content: '✅ Role berhasil ditambahkan',
          ephemeral: true
        });

      } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: '❌ Error saat assign role',
            ephemeral: true
          });
        } else {
          await interaction.reply({
            content: '❌ Error saat assign role',
            ephemeral: true
          });
        }
      }
    }
  }
};