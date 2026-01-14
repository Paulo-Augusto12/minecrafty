import { Client, Events } from "discord.js";


const ready = {
    name: Events.ClientReady,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
    },
}

export { ready }