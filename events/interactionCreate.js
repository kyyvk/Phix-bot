const config = require('../config.json');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    // SLASH COMMAND
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Error', ephemeral: true });
      }
    }

    // BUTTON ROLE SYSTEM (AUTO SWITCH)
    if (interaction.isButton()) {
      try {
        const member = interaction.member;

        const roles = config.roles;
        const allRoles = [roles.gamer, roles.creative, roles.learner];

        let roleId;
        let roleName;

        if (interaction.customId === 'role_gamer') {
          roleId = roles.gamer;
          roleName = 'Gamer';
        }

        if (interaction.customId === 'role_creative') {
          roleId = roles.creative;
          roleName = 'Creative';
        }

        if (interaction.customId === 'role_learner') {
          roleId = roles.learner;
          roleName = 'Learner';
        }

        if (!roleId) {
          return interaction.reply({ content: '❌ Role tidak ditemukan', ephemeral: true });
        }

        // remove role lama
        for (const r of allRoles) {
          if (member.roles.cache.has(r)) {
            await member.roles.remove(r);
          }
        }

        // add role baru
        await member.roles.add(roleId);

        await interaction.reply({
          content: `✅ Sekarang kamu adalah **${roleName}**`,
          ephemeral: true
        });

      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: '❌ Gagal assign role',
          ephemeral: true
        });
      }
    }
  }
};