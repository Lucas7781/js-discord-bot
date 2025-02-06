const {useTimeline} = require("discord-player");

async function resume(messageChannel) {
    // Get the queue's timeline
    const timeline = useTimeline();

    if (!timeline) {
        return messageChannel.send(
            'This server does not have an active player session.',
        );
    }

    // Invert the pause state
    const wasPaused = timeline.paused;
    if (!wasPaused) {
        return messageChannel.send(
            `The bot was already playing.`,
        )
    }
    timeline.resume()
    // If the timeline was previously paused, the queue is now back to playing
    return messageChannel.send(
        `The player is now playing.`,
    );
}

module.exports = {
    resume
}