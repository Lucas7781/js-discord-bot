const {useMainPlayer} = require("discord-player");


module.exports = class musicBot {
    constructor(guild) {
        this.player = useMainPlayer()
        //this.queue = this.player.nodes.create(guild);
    }

    async play(messageChannel, voiceChannel, input) {
        //const spotifyReg = /^(https?:\/\/open.spotify.com\/(track|user|artist|album|playlist)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+(?:\?si=[a-zA-Z0-9]+)?|)|spotify:(track|user|artist|album|playlist):[a-zA-Z0-9]+(?::playlist:[a-zA-Z0-9]+|))/
        //const youtubeReg = /^((?:https?:)?\/\/)?((?:www|m)\.)?(youtube(-nocookie)?\.com|youtu.be)(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
        try {
            await this.player.play(voiceChannel, input, {
                nodeOptions: {
                    metadata: {
                        messageChannel: messageChannel,
                        voiceChannel: voiceChannel
                    },
                },
            });
        } catch (e) {
            console.error('Error playing song:', e);
            throw e;
        }
    }
}
