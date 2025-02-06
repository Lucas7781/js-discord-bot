const { SlashCommandBuilder } = require('@discordjs/builders');
const {queue} = require("../music_logic/queue");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Prints the song queue'),
    async execute(interaction) {
        await queue(interaction.channel, interaction)
    },
};