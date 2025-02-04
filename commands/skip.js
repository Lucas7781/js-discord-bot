const { SlashCommandBuilder } = require('@discordjs/builders');
const {skip} = require("../music_logic/skip");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Make the bot skip the current song'),
    async execute(interaction) {
        //Indicate that the command is being processed
        interaction.reply({ content: 'Skipping the song for you..'});
        await skip(interaction.channel);
    },
};