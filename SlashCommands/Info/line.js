const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("line")
    .setDescription("To show line of the bot for Owners only"),

    async execute(interaction, client) {

   await interaction.reply({ content: "https://media.discordapp.net/attachments/1271463274537291920/1271540077595463762/39632582222_1-ezgif.com-webp-to-png-converter.png?ex=66bc52ba&is=66bb013a&hm=71192855661c10858edc346ef3dbb40addc9e62fd021475a26fbc9f76ca29d15&=&format=webp&quality=lossless" }) // link


      
    }
}