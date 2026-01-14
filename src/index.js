import { Client, Events, GatewayIntentBits } from 'discord.js';

import dotenv from "dotenv"

import { loadCommands } from './load-commands.js';

dotenv.config()

console.log("Minecrafty bot is starting...")


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
})

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Minecrafty bot is ready! Logged in as ${readyClient.user.tag}`)
})


loadCommands(client)

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return


    const interactionData = {
        command: interaction.commandName,
        user: interaction.user.globalName,
        member: interaction.member.user.username,
        guild: interaction.guild.id,
    }
    console.log(interactionData)

    const command = client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        })
    }
})

client.login(process.env.BOT_TOKEN)