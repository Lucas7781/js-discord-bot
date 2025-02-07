const {useQueue} = require("discord-player");
const {botReply} = require("../bot-reply");

async function clear_queue(messageChannel, interaction) {
    // Get the current queue
    const queue = useQueue();
    queue.clear()
    await botReply("Queue cleared.", messageChannel, interaction)
}

module.exports = {
    clear_queue
}