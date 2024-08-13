const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const axios = require('axios').default

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wikipedia') 
        .setDescription('Get Info About Something From WikiPedia#')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('Query You Want To Search For On WikiPedia')
                .setRequired(true)
        )
        .setDMPermission(false),

    async execute(interaction, client) {
        const query = interaction.options.getString('query')

        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`


        let response
        try {
            response = await axios(url)
        } catch (e) {
            return await interaction.reply({ content: `Something Went Wrong, Try Again Later\nNo Reslut Found For \`${query}\``, ephemeral: true })

        }

        if (response.data.type === 'disambiguation') {
            const wikipediaEmbed = new EmbedBuilder()
                .setColor('#283361')
                .setTitle(response.data.title)
                .setURL(response.data.content_urls.desktop.page)
                .setDescription([`
                        ${response.data.extract}
                        Links For Topic You Searched [Link](${response.data.content_urls.desktop.page})
                    `])

            await interaction.reply({ embeds: [wikipediaEmbed] })

        } else {
            const wikipediaEmbed = new EmbedBuilder()
                .setColor(`Random`)
                .setTitle(response.data.title)
                .setThumbnail(response.data.thumbnail.source)
                .setURL(response.data.content_urls.desktop.page)
                .setDescription(`${response.data.description}\n\n${response.data.extract}`)

            await interaction.reply({ embeds: [wikipediaEmbed] })

        }
    }
}