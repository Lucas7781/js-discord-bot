const { SlashCommandBuilder } = require('@discordjs/builders');
const sleepFunc = require('./sleep_function/sleepFunc');
const logger = require("../logging");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sleep')
        .setDescription('Sleeps for the given amount of seconds')
        .addIntegerOption((option) => option
            .setName('seconds')
            .setDescription('The number of seconds you want the bot to sleep')
            .setRequired(true)),
    async execute(interaction) {
        const seconds = interaction.options.getInteger("seconds")
        logger.debug(`[${interaction.guild.name}][Sleep] Sleep input: ${seconds}`)
        await interaction.reply({ content: 'ZzZzZzZ...', ephemeral: true }); // indicate that the command is being processed
        sleepFunc(seconds).then(() => { interaction.deleteReply() })
    },
};