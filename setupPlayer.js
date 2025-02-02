const {YoutubeiExtractor} = require("discord-player-youtubei")
const {Player} = require("discord-player");

// this is the entrypoint for discord-player based application
async function startPlayer(client) {
    const player = new Player(client)

    // Now, lets load all the default extractors
    await player.extractors.register(YoutubeiExtractor, {})
    await player.extractors.loadMulti([YoutubeiExtractor]);

    // this event is emitted whenever discord-player starts to play a track
    player.events.on('playerStart', (queue, track) => {
        // we will later define queue.metadata object while creating the queue
        queue.metadata.messageChannel.send(`Started playing **${track.title}**!`);
    });
}

module.exports = {
    startPlayer: startPlayer,
}