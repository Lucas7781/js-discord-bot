const { SlashCommandBuilder } = require('@discordjs/builders');
const {queue} = require("../music_logic/queue");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Prints the song queue'),
    async execute(interaction) {
        //Indicate that the command is being processed
        interaction.reply({ content: 'Getting the queue for you..'});
        await queue(interaction.channel)
    },
};