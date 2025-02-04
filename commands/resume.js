const { SlashCommandBuilder } = require('@discordjs/builders');
const {resume} = require("../music_logic/resume");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the last song paused'),
    async execute(interaction) {
        //Indicate that the command is being processed
        interaction.reply({ content: 'Resuming the song for you..'}); 
        await resume(interaction.channel);
    },
};