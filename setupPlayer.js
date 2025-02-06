const {YoutubeiExtractor} = require("discord-player-youtubei")
const {Player} = require("discord-player");
const {EmbedBuilder} = require("discord.js");
const {botMessage, botReply} = require("./bot-reply");

async function startPlayer(client) {
    const player = new Player(client)

    await player.extractors.register(YoutubeiExtractor, {})
    await player.extractors.loadMulti([YoutubeiExtractor]);

    player.events.on('playerStart', (queue, track) => {
        const description = queue.isEmpty() ? 'Queue is empty' : 'Next song in queue is ' + queue.tracks[0].title;
        const Embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(track.title)
            .setURL(track.url)
            .setAuthor({name: 'Now playing', url: track.url})
            .setDescription(description)
            .setThumbnail(track.thumbnail)
            .addFields({name: 'Song duration', value: track.duration})
            .setTimestamp()

        botMessage({ embeds: [Embed] }, queue.metadata.messageChannel, queue.metadata.interaction)
    });

    player.events.on('audioTrackAdd', (queue, track) => {
        const Embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(track.title)
            .setURL(track.url)
            .setAuthor({name: 'Queued song', url:track.url})
            .setDescription('Remaining songs in queue until play: ' + String(queue.getSize()))
            .setThumbnail(track.thumbnail)
            .addFields(
                { name: 'Song duration', value: track.duration },
            )
            .setTimestamp()

        botReply({ embeds: [Embed] }, queue.metadata.messageChannel, queue.metadata.interaction)
    });
}

module.exports = {
    startPlayer: startPlayer,
}