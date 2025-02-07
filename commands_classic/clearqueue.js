const logger = require('../logging');
const {clearQueue} = require("../music_logic/clearqueue");

module.exports = {
    data: {
        name: "clearqueue",
    },

    async execute(client, message) {
        try {
            clearQueue(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};