const {useMainPlayer} = require("discord-player");

async function play(input, messageChannel, voiceChannel) {
    const player = useMainPlayer()
    try {
        // Play the track in the voice channel
        const {track} = await player.play(voiceChannel, input, {
            searchEngine: "youtubeSearch", nodeOptions: {
                metadata: {
                    channel: messageChannel,
                },
            },
        });

        // Notify the user that the track is enqueued
        return messageChannel.send(`**${track.title}** is now playing!`);
    } catch (e) {
        console.error('Error playing song:', e);
        return messageChannel.send(`Something went wrong while trying to play the song: ${e.message}`);
    }
}

module.exports = {
    play: play,
}