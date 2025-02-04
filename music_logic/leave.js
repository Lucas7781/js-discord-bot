const {useQueue} = require("discord-player");

async function leave(messageChannel) {
    // Get the current queue
    const queue = useQueue();
    queue.delete()
    messageChannel.send("Remove bot from the voice channel.")
}

module.exports = {
    leave
}