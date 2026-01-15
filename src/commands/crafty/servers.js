import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
import apiService from "../../api/apiService.js"

async function getServers() {
    try {
        const servers = await apiService.get("/api/v2/servers")
        return servers.data
    } catch (error) {
        console.error(error)
    }
}

async function execute(interaction) {
    const servers = await getServers()

    const embed = new EmbedBuilder()
        .setTitle('🖥️ Servidores Crafty')
        .setColor(0x5865f2)
        .setDescription('Lista de servidores cadastrados no painel')
        .setFooter({ text: 'Crafty Controller' })
        .setTimestamp()

    servers.data.forEach(server => {
        embed.addFields({
            name: server.server_name,
            value:
                `**Tipo:** ${server.type}\n` +
                `**IP:** ${server.server_ip}:${server.server_port}\n` +
                `**Auto start:** ${server.auto_start ? '✅' : '❌'}\n` +
                `**Players:** ${server.count_players ? '👥' : '—'}\n` +
                `**ID:** \`${server.server_id}\``,
            inline: false
        })
    })

    return interaction.reply({
        embeds: [embed]
    })
}

const getServersCommand = new SlashCommandBuilder()
    .setName("servers")
    .setDescription("Get list of servers")

export default {
    data: getServersCommand,
    execute
}