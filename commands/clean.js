const {SlashCommandBuilder} = require('@discordjs/builders');
const {botReply} = require("../bot-reply");
const logger = require("../logging");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clean')
        .setDescription('Cleans the last specified messages')
        .addStringOption((option) => option
            .setName('number')
            .setDescription('The number of messages you want to delete')
            .setRequired(true)), async execute(interaction) {
        const amount = interaction.options.getInteger("number")
        logger.debug(`[${interaction.guild.name}][Clean] Clean input: ${amount}`)
        if (amount >= 100) {
            await botReply("Maximum input value is 99", interaction.channel, interaction)
            return;
        }
        await interaction.channel.bulkDelete(amount + 1)
        await botReply(`Successfully deleted ${amount} messages`, interaction.channel, interaction)
    },
};