const fs = require('fs');
const logger = require('./logging');

// Initialize env file for BOT TOKEN
const dotenv = require('dotenv');
dotenv.config();

/**
 * Returns all "!" commands
 * @returns {Map<any, any>} List of slash commands
 */
module.exports = function () {
    const commandsRet = new Map();
    const commandFiles = fs.readdirSync('./commands_classic').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands_classic/${file}`);
        commandsRet.set(command.data.name, command);
    }
    return commandsRet
};