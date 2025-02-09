const {useMainPlayer} = require("discord-player");

async function play(input, voiceChannel, messageChannel, interaction) {
    const player = useMainPlayer()
    await player.play(voiceChannel, input, {
        nodeOptions: {
            metadata: {
                messageChannel: messageChannel,
                voiceChannel: voiceChannel,
                interaction: interaction
            },
        },
    });
}

module.exports = {
    play
}