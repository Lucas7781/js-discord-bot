const { SlashCommandBuilder } = require('@discordjs/builders');
const {clear_queue} = require("../music_logic/clearqueue");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearqueue')
        .setDescription('Make the bot clear the entire queue'),
    async execute(interaction) {
        //Indicate that the command is being processed
        interaction.reply({ content: 'Clearing the queue for you..'});
        await clear_queue(interaction.channel)
    },
};