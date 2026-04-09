const config = require('../config.json');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {

    // AUTO ROLE NEW
    const newRole = member.guild.roles.cache.find(r => r.name === "new");

    if (newRole) {
      await member.roles.add(newRole);
    } else {
      console.log("❌ Role 'New' tidak ditemukan");
    }

    // WELCOME MESSAGE
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
  }
};