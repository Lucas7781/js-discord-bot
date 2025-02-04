const { SlashCommandBuilder } = require('@discordjs/builders');
const {leave} = require("../music_logic/leave");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Make the bot leave from the voice channel'),
    async execute(interaction) {
        //Indicate that the command is being processed
        interaction.reply({ content: 'Leaving the voice channel..'}); 
        await leave(interaction.channel);
    },
};