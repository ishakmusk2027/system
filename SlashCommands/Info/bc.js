const { SlashCommandBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bc')
        .setDescription('Send a message to all server members')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Enter your message')
                .setRequired(true)),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        if (interaction.user.id !== interaction.guild.ownerId) return await interaction.reply('you are not allowed to use this command !')
       

        const message = interaction.options.getString('message');
        const members = await interaction.guild.members.fetch();
        let errorCount = 0;

        members.forEach((member, index) => {
            if (member.user.bot) return;

            setTimeout(() => {
                member.send({ content: `${message}\n\n${member}` })
                    .catch((error) => {
                        errorCount++;
                    });
            }, index * 500); // Delay by 0.5 seconds per member
        });

        const replyMessage = errorCount === 0
            ? `✅ Message sent to all members successfully.`
            : `⚠️ Some members did not receive the message. ${errorCount} errors occurred.`;

        interaction.reply({ content: replyMessage, ephemeral: true });

    }
};