const {useQueue} = require("discord-player");

async function clear_queue(messageChannel) {
    // Get the current queue
    const queue = useQueue();
    queue.clear()
    messageChannel.send("Cleared music queue.");
}

module.exports = {
    clear_queue
}