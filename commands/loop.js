const {SlashCommandBuilder} = require('@discordjs/builders');
const {QueueRepeatMode} = require("discord-player");
const {loop} = require("../music_logic/loop");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop') // Command name
        .setDescription('Loop the queue in different modes') // Command description
        .addNumberOption((option) => option
            .setName('mode') // Option name
            .setDescription('The loop mode') // Option description
            .setRequired(true) // Option is required
            .addChoices(
        {name: 'Off', value: QueueRepeatMode.OFF,},
                {name: 'Track', value: QueueRepeatMode.TRACK,},
                {name: 'Queue', value: QueueRepeatMode.QUEUE,},
                {name: 'Autoplay', value: QueueRepeatMode.AUTOPLAY,},
                ),
            ),
    async execute(interaction) {
        await loop(interaction.options.getNumber('mode'), interaction.channel, interaction)
    },
};