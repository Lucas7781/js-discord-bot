const musicQueue = require('./musicQueue');
const {useMainPlayer, Player, QueryType} = require("discord-player");
const {DefaultExtractors} = require("@discord-player/extractor");
const {YoutubeiExtractor} = require("discord-player-youtubei")
//const youtubeSearchAPI = require("youtube-search-api");
const {Innertube, UniversalCache} = require('youtubei.js');
const {Session} = require("youtubei.js");

module.exports = class musicBot {
    constructor(client) {
        this.queue = new musicQueue;
        this.connection = null;
        this.messageChannel = null;
        this.loop = false
        this.currentResource = null;
        this.player = new Player(client)
        this.startPlayer()
    }

    // this is the entrypoint for discord-player based application
    async startPlayer() {
        // Now, lets load all the default extractors
        await this.player.extractors.loadMulti(DefaultExtractors);
        await this.player.extractors.register(YoutubeiExtractor, {overrideBridgeMode: "yt"})

        // this event is emitted whenever discord-player starts to play a track
        this.player.events.on('playerStart', (queue, track) => {
            // we will later define queue.metadata object while creating the queue
            queue.metadata.channel.send(`Started playing **${track.title}**!`);
        });
    }

    async play(messageChannel, voiceChannel, input) {
        const player = useMainPlayer();

        const spotifyReg = /^(https?:\/\/open.spotify.com\/(track|user|artist|album|playlist)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+(?:\?si=[a-zA-Z0-9]+)?|)|spotify:(track|user|artist|album|playlist):[a-zA-Z0-9]+(?::playlist:[a-zA-Z0-9]+|))/
        const youtubeReg = /^((?:https?:)?\/\/)?((?:www|m)\.)?(youtube(-nocookie)?\.com|youtu.be)(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

        let trackURL
        //Check if the string received is a Spotify url
        if (spotifyReg.test(input) || youtubeReg.test(input)) {
            trackURL = input
        }
        //Try to find a song with matching name
        else {
            trackURL = await this.searchYoutube(messageChannel, input)
        }

        try {
            // Play the track in the voice channel
            const {track} = await player.play(voiceChannel, trackURL, {
                nodeOptions: {
                    metadata: {
                        channel: messageChannel,
                    },
                },
            });

            // Notify the user that the track is enqueued
            return messageChannel.send(`**${track.title}** is now playing!`);
        } catch (e) {
            console.error('Error playing song:', e);
            return messageChannel.send(`Something went wrong while trying to play the song: ${e.message}`);
        }
    }

    async searchYoutube(messageChannel, input) {
        // Perform the search
        const innertube = await Innertube.create({ cache: new UniversalCache(true)});
        const searchResult = (await innertube.search(input)).results.first().id;

        // Check if we found tracks
        if (!searchResult) {
            console.error('No results found');
            return messageChannel.send(`No results found for **${input}**.`);
        }

        return `https://www.youtube.com/watch?v=${searchResult}`
    }
}
