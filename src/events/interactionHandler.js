import { Events } from "discord.js"

import { handleServerSelection, handleModalSubmission } from "../handlers/serverSelectionHandler.js"

const interactionHandler = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName)

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`)
                return
            }

            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(error)
                const response = {
                    content: "There was an error while executing this command!",
                    ephemeral: true
                }

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(response)
                } else {
                    await interaction.reply(response)
                }
            }
        } else if (interaction.isStringSelectMenu()) {
            if (interaction.customId.startsWith('server_select:') || interaction.customId.startsWith('action_select:')) {
                await handleServerSelection(interaction)
            }
        } else if (interaction.isModalSubmit()) {
            await handleModalSubmission(interaction)
        }
    },
}

export { interactionHandler }