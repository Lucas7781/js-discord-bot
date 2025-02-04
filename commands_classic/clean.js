module.exports = {
    data: {
        name: "clean",
    },

    async execute(client, message) {
        //Get input and check if it is a number and parse it
        let [first, ...rest] = message.content.split(' ')
        rest = rest.join(' ')
        if (isNaN(rest)) {
            message.channel.send("Your input is not a number!")
            return
        }
        const amount = parseInt(rest, 10)

        if (amount >= 100) {
            message.reply("Maximum input value is 99")
            return;
        }
        await message.channel.bulkDelete(amount + 1)
    },
};