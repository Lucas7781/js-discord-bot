const {Player} = require("discord-player");
const {EmbedBuilder} = require("discord.js");
const {botMessage, botReply} = require("./bot-reply");
const {generateSongList, getSongListDuration} = require("./utilities/songListOperations");

// Initialize env file for BOT TOKEN
const dotenv = require('dotenv');
const {YoutubeExtractor} = require("discord-player-youtube");
dotenv.config();

async function startPlayer(client) {
    const player = new Player(client);

    await player.extractors.register(YoutubeExtractor, {
        cookie: process.env.YOUTUBE_COOKIE,
        filterAutoplayTracks: true, // enabled by default
        disableYTJSLog: true, // silence youtubei.js logs
    });
    await player.extractors.loadMulti([
        YoutubeExtractor,
    ]);

    await addPlayerStartListener(player);
    await addAddTrackListener(player);
    await addAddTracksListeners(player);
    await addErrorListeners(player);
}

async function addPlayerStartListener(player) {
    player.events.on('playerStart', (queue, track) => {
        const description = queue.isEmpty() ? 'Queue is empty' : 'Next song in queue is ' + queue.tracks.at(0).title;
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
}

async function addAddTrackListener(player) {
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
}

async function addAddTracksListeners(player) {
    player.events.on('audioTracksAdd', (queue, tracks) => {
        // Embed message
        const Embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Queued ${tracks.length} songs`)
            .addFields(
                {name: 'Songs', value: generateSongList(tracks)},
                {name: 'Total duration', value: getSongListDuration(tracks)}
            )
            .setTimestamp();

        botReply({embeds: [Embed]}, queue.metadata.messageChannel, queue.metadata.interaction);
    });
}

async function addErrorListeners(player) {
    player.events.on('playerError', (queue, error) => {
        const Embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Player Error')
            .setDescription(`An error occurred: \`${error.message}\``)
            .setTimestamp();

        botReply({embeds: [Embed]}, queue?.metadata?.messageChannel, queue?.metadata?.interaction);
    });

    player.events.on('error', (queue, error) => {
        const Embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('General Error')
            .setDescription(`An error occurred: \`${error.message}\``)
            .setTimestamp();

        botReply({embeds: [Embed]}, queue?.metadata?.messageChannel, queue?.metadata?.interaction);
    });
}

module.exports = {
    startPlayer: startPlayer,
}