const { SlashCommandBuilder } = require('@discordjs/builders')
const {pause} = require("../music_logic/pause");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Make the bot pause the current song'),
    async execute(interaction) {
        //Indicate that the command is being processed
        await pause(interaction.channel);
    },
};