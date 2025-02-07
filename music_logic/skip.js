const {useQueue} = require("discord-player");
const {botReply} = require("../bot-reply");

async function skip(messageChannel, interaction) {
    // Get the current queue
    const queue = useQueue();

    if (!queue) {
        await botReply('This server does not have an active player session.', messageChannel, interaction)
        return;
    }

    if (!queue.isPlaying()) {
        await botReply('There is no track playing.', messageChannel, interaction);
        return;
    }

    // Skip the current track
    queue.node.skip();

    // Send a confirmation message
    await botReply('Skipped the current song.', messageChannel, interaction);
}

module.exports = {
    skip
}