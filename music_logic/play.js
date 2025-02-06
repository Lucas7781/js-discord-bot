const {useMainPlayer} = require("discord-player");
const {logger} = require("../logging");

async function play(input, voiceChannel, messageChannel, interaction) {
    const player = useMainPlayer()
    try {
        await player.play(voiceChannel, input, {
            nodeOptions: {
                metadata: {
                    messageChannel: messageChannel,
                    voiceChannel: voiceChannel,
                    interaction: interaction
                },
            },
        });
    } catch (e) {
        await logger.error("An error occurred while trying to play the song: " + e);
        throw e;
    }
}

module.exports = {
    play
}