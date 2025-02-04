const logger = require('../logging');
const {queue} = require("../music_logic/queue");

module.exports = {
    data: {
        name: "queue",
    },

    async execute(client, message) {
        try {
            queue(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};