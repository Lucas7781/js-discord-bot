const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
const Discord = require('discord.js');

// Setup environment
const dotenv = require('dotenv');
const logger = require("./logging");
dotenv.config();

// Fetch Discord Bot token
const token = process.env.BOT_TOKEN

// Setup permissions
const client = new Discord.Client({
    intents: ['GuildVoiceStates' /* Other intents */],
});

// Login Bot
logger.info("Successfully logged in and running!")
client.login(token);
