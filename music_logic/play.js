const {useMainPlayer} = require("discord-player");

async function play(messageChannel, voiceChannel, input) {
    const player = useMainPlayer()
    try {
        await player.play(voiceChannel, input, {
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

module.exports = {
    play
}