const logger = require('./logging');
const musicBot = require("./MusicBot");

module.exports = class botModel {
    constructor(guild_id) {
        this.musicBot = new musicBot(guild_id);
    }

    leaveMusic() {
    }
}
