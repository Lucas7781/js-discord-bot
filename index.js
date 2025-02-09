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
client.guildList = []


// Start player instance
const {startPlayer} = require("./setupPlayer");
try {
    startPlayer(client).then(() => {
        logger.info("[Player] Player initialized successfully!")
    });
} catch (err) {
    logger.error(`[Player] ${err}`);
}


// Give commands list to the client and initialize slash commands
const { registerCommands } = require("./commandRegister");
try{
    registerCommands().then(result => {
        client.commands = result
        logger.info("[Slash Commands Registration] Slash commands registered successfully!")
    })
}
catch (err) {
    logger.error(`[Slash Commands Registration] ${err}`)
}

// Initialize the "!" commands
const commandClassicRegister = require('./commandClassicRegister')
const {useMainPlayer} = require("discord-player");
try{
    client.commandsClassic = commandClassicRegister()
    logger.info("[Classic Commands Registration] Classic commands registered successfully!")
}
catch (err) {
    logger.error(`[Classic Commands Registration] ${err}`)
}


// Main logic for detecting changes in voice channel
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    //Checks and returns if the state change concerns the bot, otherwise continue
    if (newState.member.user.id !== process.env.CLIENT_ID) return

    // Represents a mute/deafen update
    if (oldState.channelId === newState.channelId) return logger.debug(`[${newState.guild.name}] Mute/Deafen Update`);

    // Some connection
    if (!oldState.channelId && newState.channelId) return logger.debug(`[${newState.guild.name}] Connection Update`);

    // Disconnection
    if (oldState.channelId && !newState.channelId) {
        if (newState.id === client.user.id) return logger.debug(`[${newState.guild.name}] Bot has disconnected!`);
    }
});

// Main interaction logic for slash commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    logger.debug(`[${interaction.guild.name}] Slash command received: ${interaction.commandName}`);
    const command = client.commands.get(interaction.commandName);
    try {
        const player = useMainPlayer()
        await player.context.provide({guild: interaction.guild}, () => command.execute(interaction));
    } catch (err) {
        logger.error(`[${interaction.guild.name}][${interaction.commandName}] ${err}`);
    }
});

// Main interaction logic for ! commands
client.on(Events.MessageCreate, async message => {
    if (message.content.startsWith("!")) {
        logger.debug(`[${message.guild.name}] Simple command received: ${message.content}`)

        const command_name = message.content.split("!")[1].split(" ")[0]
        const command = client.commandsClassic.get(command_name);
        try {
            const player = useMainPlayer()
            await player.context.provide({guild: message.guild}, () => command.execute(client, message));
        } catch (err) {
            logger.error(`[${message.guild.name}][${command_name}] ${err}`);
        }
    }
})

try{
    client.login(token).then(() => {
        logger.info("[Bot] Successfully logged in and running!")
    });
}
catch (err) {
    logger.error(`[Bot Login] ${err}`)
}