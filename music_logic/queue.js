const {useQueue} = require("discord-player");
const {botReply} = require("../bot-reply");
const {EmbedBuilder} = require("discord.js");
const {generateSongList} = require("../utilities/songListOperations");

async function queue(messageChannel, interaction) {
    // Get the current queue
    const queue = useQueue();

    if (!queue || !queue.currentTrack) {
        return messageChannel.send('This server does not have an active player session.',);
    }
    // Get the current track
    const currentTrack = queue.currentTrack;

    // Get the upcoming tracks
    const upcomingTracks = queue.tracks.toArray();

    const Embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setAuthor({ name: 'Songs in queue:' })
        .setDescription(`There are ${queue.getSize()} more songs in the queue`)
        .addFields(
            { name: 'Now playing:', value: `[${currentTrack.title}](${currentTrack.url})` },
            { name: 'Upcoming:', value: generateSongList(upcomingTracks) }
        )
        .setTimestamp();

    // Send the message
    await botReply({embeds: [Embed]}, messageChannel, interaction);
}

module.exports = {
    queue
}