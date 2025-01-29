const {Client, GatewayIntentBits} = require("discord.js")
const {play} = require('./play')
const {Player} = require("discord-player")
const {YoutubeiExtractor} = require("discord-player-youtubei")
require("dotenv").config()

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages,],
});

client.once("ready", () => {
    startPlayer(client).then(r => process.send({action: "initialized", message: "Worker ready!"}))
});


process.on("message", async (msg) => {
    switch (msg.action) {
        case "play":
            const guild = client.guilds.cache.get(msg.guildId);
            if (!guild) {
                console.error("Guild not found.");
                return;
            }
            const messageChannel = guild.channels.cache.get(msg.messageChannelId);
            const voiceChannel = guild.channels.cache.get(msg.voiceChannelId);
            await play(msg.input, messageChannel, voiceChannel);
            break;
    }
});

/**
 *
 * @param client {Client}
 * @returns {Promise<void>}
 */
async function startPlayer(client) {
    // Load all extractors
    const player = new Player(client);
    await player.extractors.register(YoutubeiExtractor, {})
    await player.extractors.loadMulti([YoutubeiExtractor])

    // Event when the bot starts to play a track
    player.events.on('playerStart', (queue, track) => {
        // we will later define queue.metadata object while creating the queue
        queue.metadata.channel.send(`Started playing **${track.title}**!`);
    });
    console.log("Finished setup");
}

client.login(process.env.BOT_TOKEN);