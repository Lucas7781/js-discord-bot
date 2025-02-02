const logger = require('./logging');

//MusicBot Commands
function pause(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.pause()
    }
}

function skip(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.skip()
    }
}

function loop(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.startLoop()
    }
}

function stopLoop(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.stopLoop()
    }
}

function resume(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.resume()
    }
}

function seek(client, message) {
    if (client.botMap.has(message.guild.id)) {
        logger.info("Seeking into the song")
        const seekTime = message.content.split(' ')[1]
        client.botMap.get(message.guild.id).musicBot.seek(seekTime)
    }
}

function queue(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.getQueue()
    }
}

function dequeue(client, message) {
    //Get input and check if it is a number and parse it
    let [first, ...rest] = message.content.split(' ')
    rest = rest.join(' ')
    if (isNaN(rest)) {
        message.channel.send("Your input is not a number!")
        return
    }
    const position = parseInt(rest, 10)

    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.removeSongAt(position, message.channel)
    }
}

function clearQueue(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).musicBot.clearQueue()
    }
}

function leave(client, message) {
    if (client.botMap.has(message.guild.id)) {
        client.botMap.get(message.guild.id).leaveMusic(client)
    }
}

module.exports = {
    pause: pause,
    skip: skip,
    resume: resume,
    seek: seek,
    queue: queue,
    leave: leave,
    clearQueue: clearQueue,
    dequeue: dequeue,
    loop: loop,
    stopLoop: stopLoop,
};
