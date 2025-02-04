const logger = require('../logging');
const {resume} = require("../music_logic/resume");

module.exports = {
    data: {
        name: "resume",
    },

    async execute(client, message) {
        try {
            resume(message.channel).catch(err => logger.error(err))
        } catch (err) {
            logger.error(err)
        }
    },
};