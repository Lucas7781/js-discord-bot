async function botReply(message, messageChannel, interaction) {
    if (!interaction) {
        messageChannel.send(message)
        return
    }
    interaction.reply(message)
}

async function botMessage(message, messageChannel, interaction) {
    if (!interaction) {
        messageChannel.send(message)
        return
    }
    interaction.channel.send(message)
}

module.exports = {
    botReply,
    botMessage,
}