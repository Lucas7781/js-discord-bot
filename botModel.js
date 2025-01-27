const musicBot = require('./MusicBot');

module.exports = class botModel {
    constructor(client) {
        this.musicBot = new musicBot(client);
    }

    leaveMusic(client) {
        // if(this.musicBot.connection) {
        //     this.musicBot.connection.destroy()
        //     this.musicBot.player.stop()
        //     this.musicBot.clearQueue()
        // }
        this.musicBot = new musicBot(client);
    }
}
