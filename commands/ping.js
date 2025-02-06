const { SlashCommandBuilder } = require('@discordjs/builders');
const {botReply} = require("../bot-reply");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await botReply('Pong!', interaction.channel, interaction);
	},
};