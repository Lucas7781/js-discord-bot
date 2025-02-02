const botModel = require('../botModel');
const logger = require('../logging');

module.exports = {
    data: {
        name: "play",
    },

    async execute(client, message) {
        //If we receive !play make sure we have a bot initialized
        if (!client.botMap.has(message.guild.id)) {
            let bot = new botModel(message.guild.id)
            client.botMap.set(message.guild.id, bot);
        }
        try {
            let input = message.content.split(' ');
            input.shift();
            input = input.join(' ')
            client.botMap.get(message.guild.id).musicBot.play(message.channel, message.member.voice.channel, input).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};