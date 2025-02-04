const logger = require('../logging');
const {skip} = require("../music_logic/skip");

module.exports = {
    data: {
        name: "skip",
    },

    async execute(client, message) {
        try {
            skip(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};