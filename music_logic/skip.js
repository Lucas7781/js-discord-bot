const {useQueue} = require("discord-player");

async function skip(messageChannel) {
    // Get the current queue
    const queue = useQueue();

    if (!queue) {
        return messageChannel.send(
            'This server does not have an active player session.',
        );
    }

    if (!queue.isPlaying()) {
        return messageChannel.send('There is no track playing.');
    }

    // Skip the current track
    queue.node.skip();

    // Send a confirmation message
    return messageChannel.send('The current song has been skipped.');
}

module.exports = {
    skip
}