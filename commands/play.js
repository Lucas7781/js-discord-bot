const { SlashCommandBuilder } = require('@discordjs/builders');
const sleepFunc = require('./sleep_function/sleepFunc');
const logger = require('../logging');
const {play} = require("../music_logic/play");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song from YouTube or Spotify using link or name')
        .addStringOption((option) => option
            .setName('song')
            .setDescription('The URL or name of the song')
            .setRequired(true)),


    async execute(interaction) {
        //Indicate that the command is being processed
        try {
            const input = interaction.options.get("song").value
            const voiceChannel = interaction.member.voice.channel
            play(input, voiceChannel, interaction.channel, interaction).catch(err =>{
                logger.error(err)
            })
        } catch (err) {
            logger.error(err)
        }

    },
};