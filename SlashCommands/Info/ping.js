const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping for you'),//
      
       async execute(interaction, client) {
    try {
      const embed = new EmbedBuilder()
        .setColor("#283361")
.setThumbnail(client.user.displayAvatarURL())
            .setTitle('ping for you')
            .setDescription(`**Pong 🏓: Your ping is ${Math.round(client.ws.ping)} ms**`);

await interaction.reply({ embeds: [embed] })

} catch (err) {
      console.log(err)
  }
 }
}
