const logger = require('../logging');
const {play} = require("../music_logic/play");
const {botReply} = require("../bot-reply");

module.exports = {
    data: {
        name: "play",
    },

    async execute(client, message) {
        try {
            let input = message.content.split(' ');
            input.shift();
            input = input.join(' ')
            play(input, message.member.voice.channel, message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};