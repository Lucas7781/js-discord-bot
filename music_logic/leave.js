const {useQueue} = require("discord-player");
const {botReply} = require("../bot-reply");

async function leave(messageChannel, interaction) {
    // Get the current queue
    const queue = useQueue();
    queue.delete()
    await botReply("Fine I'll leave :crying_cat_face:", messageChannel, interaction)
}

module.exports = {
    leave
}