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

        botMessage({embeds: [Embed]}, queue.metadata.messageChannel, queue.metadata.interaction)
    });

    player.events.on('audioTrackAdd', (queue, track) => {
        const Embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(track.title)
            .setURL(track.url)
            .setAuthor({name: 'Queued song', url: track.url})
            .setDescription('Remaining songs in queue until play: ' + String(queue.getSize()))
            .setThumbnail(track.thumbnail)
            .addFields(
                {name: 'Song duration', value: track.duration},
            )
            .setTimestamp()

        botReply({embeds: [Embed]}, queue.metadata.messageChannel, queue.metadata.interaction)
    });

    player.events.on('audioTracksAdd', (queue, track) => {
        // Format song list with index numbers
        let songs = track.map((song, index) => `${index + 1}. [${song.title}](${song.url})`).join('\n');

        // Calculate total duration in seconds
        let duration = track.reduce((total, song) =>
            total + song.duration.split(':').reduce((acc, time) => (60 * acc) + +time), 0
        );

        // Format duration dynamically (hh:mm:ss if > 1 hour, otherwise mm:ss)
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration % 3600) / 60);
        let seconds = duration % 60;
        let final_duration = hours > 0
            ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${minutes}:${seconds.toString().padStart(2, '0')}`;

        const Embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Queued ${track.length} songs`)
            .addFields(
                { name: 'Songs', value: songs || 'No songs found' },
                { name: 'Total duration', value: final_duration }
            )
            .setTimestamp();

        botReply({ embeds: [Embed] }, queue.metadata.messageChannel, queue.metadata.interaction);
    });


}

module.exports = {
    startPlayer: startPlayer,
}