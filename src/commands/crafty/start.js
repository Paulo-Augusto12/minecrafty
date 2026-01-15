import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { getServers, generateServerSelectMenu, getServersWithStats } from "../../utils/crafty.js"

async function execute(interaction) {
    await interaction.deferReply()
    try {
        const servers = await getServersWithStats()

        const stoppedServers = servers.filter(s => !s.running)

        if (!stoppedServers || stoppedServers.length === 0) {
            return interaction.editReply({ content: 'Nenhum servidor parado encontrado.' })
        }

        const row = generateServerSelectMenu(stoppedServers, 'start')

        const embed = new EmbedBuilder()
            .setTitle('🟢 Iniciar Servidor')
            .setColor(0x57f287) // Green
            .setDescription('Selecione um servidor abaixo para iniciar')

        return interaction.editReply({
            embeds: [embed],
            components: [row]
        })
    } catch (error) {
        console.error(error)
        return interaction.editReply({ content: 'Erro ao buscar servidores.' })
    }
}

const startCommand = new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start a server")

export default {
    data: startCommand,
    execute
}
