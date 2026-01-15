import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { generateServerSelectMenu, getServersWithStats } from "../../utils/crafty.js"

async function execute(interaction) {
    await interaction.deferReply()
    try {
        const servers = await getServersWithStats()

        const runningServers = servers.filter(s => s.running)

        if (!runningServers || runningServers.length === 0) {
            return interaction.editReply({ content: 'Nenhum servidor rodando encontrado.' })
        }

        const row = generateServerSelectMenu(runningServers, 'stop')

        const embed = new EmbedBuilder()
            .setTitle('🔴 Parar Servidor')
            .setColor(0xed4245) // Red
            .setDescription('Selecione um servidor abaixo para parar')

        return interaction.editReply({
            embeds: [embed],
            components: [row]
        })
    } catch (error) {
        console.error(error)
        return interaction.editReply({ content: 'Erro ao buscar servidores.' })
    }
}

const stopCommand = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop a server")

export default {
    data: stopCommand,
    execute
}
