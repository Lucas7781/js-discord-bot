const {useQueue} = require("discord-player");
const {botReply} = require("../bot-reply");
const {EmbedBuilder} = require("discord.js");

async function queue(messageChannel, interaction) {
    // Get the current queue
    const queue = useQueue();

    if (!queue) {
        return messageChannel.send(
            'This server does not have an active player session.',
        );
    }
    // Get the current track
    const currentTrack = queue.currentTrack;

    // Get the upcoming tracks
    const upcomingTracks = queue.tracks.toArray();

    // Create a message with the current track and upcoming tracks
    const Embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setAuthor({name : 'Songs in queue:'})
        .setDescription('There are ' + queue.getSize() + ' more songs in the queue')
        .addFields(
            // The now playing track should also reference the track url for easy access
            { name: 'Now playing:', value: `[${currentTrack.title}](${currentTrack.url})` },
            { name: 'Upcoming:', value: upcomingTracks.map((track, i) => `${i + 1}. [${track.title}](${track.url})`).join('\n') },
        )
        .setTimestamp()

    // Send the message
    await botReply({ embeds: [Embed] }, messageChannel, interaction);
}

module.exports = {
    queue
}