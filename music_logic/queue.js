const {useQueue} = require("discord-player");

async function queue(messageChannel) {
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
    const upcomingTracks = queue.tracks.toArray().slice(0, 5);

    // Create a message with the current track and upcoming tracks
    const message = [
        `**Now Playing:** ${currentTrack.title} - ${currentTrack.author}`,
        '',
        '**Upcoming Tracks:**',
        ...upcomingTracks.map(
            (track, index) => `${index + 1}. ${track.title} - ${track.author}`,
        ),
    ].join('\n');

    // Send the message
    return messageChannel.send(message);
}

module.exports = {
    queue
}