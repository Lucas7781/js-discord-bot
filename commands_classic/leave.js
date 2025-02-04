const logger = require('../logging');
const {leave} = require("../music_logic/leave");

module.exports = {
    data: {
        name: "leave",
    },

    async execute(client, message) {
        try {
            leave(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};