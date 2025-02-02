// Setup the logger
const logger = require('./logging');

// Setup reading from the environment
const dotenv = require('dotenv');
dotenv.config();

// Fetch bot token from environment
const token = process.env.BOT_TOKEN

// Setup bot permissions
const {Client, GatewayIntentBits, Events} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent]});

// Give map for playlists in client
client.botMap = new Map();


// Start player instance
const {startPlayer} = require("./setupPlayer");
startPlayer(client);


// Give commands list to the client and initialize slash commands
const commandRegister = require("./commandRegister");
commandRegister().then(result => {
    client.commands = result
})

// Initialize the "!" commands
const commandClassicRegister = require('./commandClassicRegister')
const {useMainPlayer} = require("discord-player");
client.commandsClassic = commandClassicRegister()


// Main logic for detecting changes in voice channel
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    //Checks and returns if the state change concerns the bot, otherwise continue
    if (newState.member.user.id !== process.env.CLIENT_ID) return

    // Represents a mute/deafen update
    if (oldState.channelId === newState.channelId) return logger.debug('Mute/Deafen Update');

    // Some connection
    if (!oldState.channelId && newState.channelId) return logger.debug('Connection Update');

    // Disconnection
    if (oldState.channelId && !newState.channelId) {
        // Bot was disconnected?
        if (client.botMap.has(newState.guild.id)) {
            client.botMap.get(newState.guild.id).leaveMusic(client)
        }

        if (newState.id === client.user.id) return logger.debug(`${client.user.username} was disconnected from "${newState.guild.name}" server!`);
    }
});

// Main interaction logic for slash commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    try {
        const player = useMainPlayer()
        await player.context.provide({guild: interaction.guild}, () => command.execute(interaction, client));
    } catch (err) {
        logger.error(err);
    }
});

// Main interaction logic for ! commands
client.on(Events.MessageCreate, async message => {
    if (message.content.startsWith("!")) {
        logger.debug("Command received: " + message.content)

        const command_name = message.content.split("!")[1].split(" ")[0]
        const command = client.commandsClassic.get(command_name);
        try {
            const player = useMainPlayer()
            await player.context.provide({guild: message.guild}, () => command.execute(client, message));
        } catch (err) {
            logger.error(err);
        }
    }
})

logger.info("Successfully logged in and running!")
client.login(token);