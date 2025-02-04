const logger = require('../logging');
const {pause} = require("../music_logic/pause");

module.exports = {
    data: {
        name: "pause",
    },

    async execute(client, message) {
        try {
            pause(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};