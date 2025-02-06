const { SlashCommandBuilder } = require('@discordjs/builders');
const {botReply} = require("../bot-reply");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pop')
        .setDescription('Replies with Pop!'),
    async execute(interaction) {
        await botReply('Pop!', interaction.channel, interaction);
    },
};