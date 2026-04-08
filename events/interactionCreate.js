module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    // SLASH COMMAND
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: '❌ Error menjalankan command',
          ephemeral: true
        });
      }
    }

    // BUTTON
    if (interaction.isButton()) {
      try {
        const roleMap = {
          gamer: '1491527324632350760',
          creative: '1491527396875046952',
          learner: '1491527464093220955'
        };

        const roleId = roleMap[interaction.customId];
        if (!roleId) return;

        const member = interaction.member;

        if (member.roles.cache.has(roleId)) {
          await member.roles.remove(roleId);
          return interaction.reply({
            content: `❌ Role dilepas`,
            ephemeral: true
          });
        }

        await member.roles.add(roleId);

        await interaction.reply({
          content: `✅ Role berhasil ditambahkan`,
          ephemeral: true
        });

      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: '❌ Error saat assign role',
          ephemeral: true
        });
      }
    }
  }
};