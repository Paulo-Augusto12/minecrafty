import { Client, Events, GatewayIntentBits } from 'discord.js';

import dotenv from "dotenv"

import { loadCommands } from './load-commands.js';
import { ready } from './events/ready.js';
import { interactionHandler } from './events/interactionHandler.js';

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

client.on(ready.name, ready.execute)
client.on(interactionHandler.name, interactionHandler.execute)

client.login(process.env.BOT_TOKEN)