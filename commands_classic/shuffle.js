const logger = require('../logging');
const {shuffle} = require("../music_logic/shuffle");

module.exports = {
    data: {
        name: "shuffle",
    },

    async execute(client, message) {
        try {
            shuffle(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};