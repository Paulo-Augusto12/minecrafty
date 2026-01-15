import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { getServers, generateServerSelectMenu } from "../../utils/crafty.js"

async function execute(interaction) {
    await interaction.deferReply()
    try {
        const servers = await getServers()

        if (!servers || servers.length === 0) {
            return interaction.editReply({ content: 'Nenhum servidor encontrado.' })
        }

        const row = generateServerSelectMenu(servers, 'console_write')

        const embed = new EmbedBuilder()
            .setTitle('💻 Console do Servidor')
            .setColor(0x5865f2)
            .setDescription('Selecione um servidor para enviar comandos')

        return interaction.editReply({
            embeds: [embed],
            components: [row]
        })
    } catch (error) {
        console.error(error)
        return interaction.editReply({ content: 'Erro ao buscar servidores.' })
    }
}

const consoleCommand = new SlashCommandBuilder()
    .setName("console")
    .setDescription("Send commands to a server (Start, Stop, Custom)")

export default {
    data: consoleCommand,
    execute
}
