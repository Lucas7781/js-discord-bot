const logger = require('../logging');
const {play} = require("../music_logic/play");

module.exports = {
    data: {
        name: "play",
    },

    async execute(client, message) {
        try {
            let input = message.content.split(' ');
            input.shift();
            input = input.join(' ')
            play(message.channel, message.member.voice.channel, input).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};