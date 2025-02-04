const {useTimeline} = require("discord-player");

async function pause(messageChannel) {
    // Get the queue's timeline
    const timeline = useTimeline();

    if (!timeline) {
        return messageChannel.send(
            'This server does not have an active player session.',
        );
    }

    // Invert the pause state
    const wasPaused = timeline.paused;

    wasPaused ? timeline.resume() : timeline.pause();

    // If the timeline was previously paused, the queue is now back to playing
    return messageChannel.send(
        `The player is now ${wasPaused ? 'playing' : 'paused'}.`,
    );
}

module.exports = {
    pause
}