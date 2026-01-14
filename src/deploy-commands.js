import path from "path"
import fs from "fs"
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { REST, Routes } from "discord.js";
import dotenv from "dotenv"

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clientId = process.env.DISCORD_APPLICATION_CLIENT_ID
const guildId = process.env.GUILD_ID
const botToken = process.env.BOT_TOKEN

const commands = []

const foldersPath = path.join(__dirname, "commands")
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(foldersPath, folder)).filter(file => file.endsWith(".js"))
    for (const file of commandFiles) {
        const filePath = path.join(foldersPath, folder, file)
        const command = await import(filePath).then((module) => module.default)
        console.log(`Loading command /${command.data.name} from ${filePath}`)

        if ("data" in command && "execute" in command) {
            commands.push(command.data)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
        }
    }
}

const rest = new REST().setToken(botToken);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();