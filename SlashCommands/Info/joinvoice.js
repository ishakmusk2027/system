const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Join To Voice Channel.")
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Voice channel mention to Join.')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const VoiceChannelJoin = interaction.options.getChannel('channel');

        try {
            joinVoiceChannel({
                channelId: VoiceChannelJoin.id,
                guildId: VoiceChannelJoin.guild.id,
                adapterCreator: VoiceChannelJoin.guild.voiceAdapterCreator,
            });

            await interaction.reply({ content: `🔷 **Voice Channel successfully logged in**`, ephemeral: false });
        } catch (err) {
            console.log(err);
            const EmbedError = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("Something went wrong. Please contact the developers")
                .setColor('#283361')
                .setTimestamp()

            await interaction.reply({ embeds: [EmbedError], ephemeral: true });
        }
    }
}