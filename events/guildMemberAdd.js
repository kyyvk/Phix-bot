const config = require('../config.json');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const channel = member.guild.channels.cache.get(config.channels.welcome);

    if (channel) {
      channel.send(
        `👋 Welcome ${member} ke Phix!

🎯 Mulai dari sini:
1. Pilih role di /setup-roles
2. Kenalan di #general
3. Share karya di #share-your-work

🔥 Jangan cuma jadi penonton ya.`
      );
    }
    const role = member.guild.roles.cache.find(r => r.name === "New");
      if (role) {
      member.roles.add(role);
    }
  }
};