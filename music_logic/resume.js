const {useTimeline} = require("discord-player");
const {botReply} = require("../bot-reply");

async function resume(messageChannel, interaction) {
    // Get the queue's timeline
    const timeline = useTimeline();

    if (!timeline) {
        await botReply("This server does not have an active player session.", messageChannel, interaction);
        return
    }

    // Invert the pause state
    const wasPaused = timeline.paused;

    wasPaused ? timeline.resume() : timeline.pause();
    const reply_text = wasPaused ? `The player is now resumed.`: `The player was already playing dumbass :goblin:`

    // If the timeline was previously paused, the queue is now back to playing
    await botReply(reply_text, messageChannel, interaction)
}

module.exports = {
    resume
}