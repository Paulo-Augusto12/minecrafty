import { SlashCommandBuilder } from 'discord.js'

async function execute(interaction) {
    await interaction.reply("Pong!")
}

const ping = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong"),
    execute
}


export default ping