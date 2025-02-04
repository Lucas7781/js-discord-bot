const logger = require('../logging');
const {clear_queue} = require("../music_logic/clearqueue");

module.exports = {
    data: {
        name: "clearqueue",
    },

    async execute(client, message) {
        try {
            clear_queue(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};