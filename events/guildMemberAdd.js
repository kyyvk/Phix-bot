const config = require('../config.json');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {

    // AUTO ROLE "new"
    const role = member.guild.roles.cache.find(r => r.name === "new");
    if (role) {
      await member.roles.add(role);
    }

    // WELCOME MESSAGE
    const channel = member.guild.channels.cache.get(config.channels.welcome);

    if (channel) {
      channel.send(`👋 Welcome ${member} ke Phix!

Mulai dari sini:
1. Pilih role (/setup-roles)
2. Chat di #general
3. Share karya nanti setelah unlock

🔥 Jangan cuma jadi penonton ya.`);
    }
  }
};