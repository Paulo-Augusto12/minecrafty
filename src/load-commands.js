import path from "path"
import fs from "fs"
import { Collection } from "discord.js"
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadCommands(client) {
    client.commands = new Collection()

    const commandsPath = path.join(__dirname, "commands")
    const commandFolders = fs.readdirSync(commandsPath)

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith(".js"))
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, folder, file)
            const command = await import(filePath).then((module) => module.default)
            console.log(`Loading command /${command.data.name} from ${filePath}`)

            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command)
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
            }
        }
    }
}


export { loadCommands }