module.exports = {
    data: {
        name: "bot get him",
    },

    async execute(client, message) {
        message.channel.send("Here is a list with all of the commands available for slash or ! commands:\n" + "\tplay <song/playlist> - Plays a song or playlist. If there are songs in the queue, the song will be added at the end of the queue \n" + "\tpause - Pauses the current song \n" + "\tresume - Resumes a paused song \n" + "\tskip - Skips the current song. If a song is looping, the loop will also stop \n" + "\tseek <seconds> - Skips to the timestamp within the song \n" + "\tqueue - Displays a list with the queued songs \n" + "\tdequeue <number> - Removes given song from the queue \n" + "\tclearQueue - removes all songs from the queue \n" + "\tloop - Current song will be looped \n" + "\tstopLoop - Stops looping current song after it ends \n" + "\tleave - Disconnects the bot from the channel. Note: it will also delete the queue \n" + "\tclean <number> - Deletes the given number of messages from the text channel \n")
    },
};