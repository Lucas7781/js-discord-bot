const {botReply} = require("../bot-reply");
const {useQueue} = require("discord-player");


async function seek(seconds, messageChannel, interaction) {
    // Get the current queue
    const queue = useQueue();
    if (!queue) {
        await botReply(
            'This server does not have an active player session.', messageChannel, interaction
        );
        return;
    }

    // Set the loop mode
    await queue.node.seek(seconds * 1000);

    // Send a confirmation message
    await botReply(`Skipped to ${seconds} seconds in the current song.`, messageChannel, interaction);
}

module.exports = {
    seek
}