import { ActionRowBuilder, EmbedBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import { getServersWithStats, sendConsoleCommand, startServer, stopServer } from "../utils/crafty.js"

export async function handleServerSelection(interaction) {
    const customId = interaction.customId
    const action = customId.split(':')[1]
    const serverId = interaction.values[0]

    switch (action) {
        case 'status':
            await handleStatus(interaction, serverId)
            break
        case 'start':
            await handleStart(interaction, serverId)
            break
        case 'stop':
            await handleStop(interaction, serverId)
            break
        case 'console_write':
            await handleConsoleWrite(interaction, serverId)
            break
        default:
            await interaction.reply({ content: 'Ação desconhecida.', ephemeral: true })
    }
}

async function handleStart(interaction, serverId) {
    await interaction.deferReply()
    try {
        await startServer(serverId)
        await interaction.editReply({ content: `✅ Enviando comando de **INICIAR** para o servidor ID \`${serverId}\`...` })
    } catch (error) {
        await interaction.editReply({ content: 'Erro ao iniciar o servidor.' })
    }
}

async function handleStop(interaction, serverId) {
    await interaction.deferReply()
    try {
        await stopServer(serverId)
        await interaction.editReply({ content: `🛑 Enviando comando de **PARAR** para o servidor ID \`${serverId}\`...` })
    } catch (error) {
        await interaction.editReply({ content: 'Erro ao parar o servidor.' })
    }
}

async function handleConsoleWrite(interaction, serverId) {
    const modal = new ModalBuilder()
        .setCustomId(`custom_command_modal:${serverId}`)
        .setTitle('Comando Customizado')

    const commandInput = new TextInputBuilder()
        .setCustomId('commandInput')
        .setLabel("Digite o comando")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

    const firstActionRow = new ActionRowBuilder().addComponents(commandInput)
    modal.addComponents(firstActionRow)

    await interaction.showModal(modal)
}

export async function handleModalSubmission(interaction) {
    if (interaction.customId.startsWith('custom_command_modal:')) {
        const serverId = interaction.customId.split(':')[1]
        const command = interaction.fields.getTextInputValue('commandInput')

        await interaction.deferReply()
        try {
            await sendConsoleCommand(serverId, command)
            await interaction.editReply({ content: `✅ Comando \`${command}\` enviado para o servidor \`${serverId}\`!` })
        } catch (error) {
            await interaction.editReply({ content: `❌ Erro ao enviar comando \`${command}\`.` })
        }
    }
}

async function handleStatus(interaction, serverId) {
    await interaction.deferReply()

    try {
        const servers = await getServersWithStats()
        const server = servers.find(s => s.serverId === serverId)

        if (!server) {
            return interaction.editReply({ content: '❌ Servidor não encontrado.' })
        }

        const statusEmoji = server.running ? '🟢' : '🔴'
        const statusText = server.running ? 'ONLINE' : 'OFFLINE'

        const embed = new EmbedBuilder()
            .setTitle(`📊 ${server.name}`)
            .setColor(server.running ? 0x57f287 : 0xed4245)
            .setDescription(`${statusEmoji} **${statusText}**`)
            .addFields(
                { name: '🧩 Tipo', value: server.type, inline: true },
                { name: '🆔 ID', value: `\`${server.serverId}\``, inline: true },
                { name: '👥 Jogadores', value: `${server.onlinePlayers}/${server.maxPlayers}`, inline: true }
            )

        if (server.running) {
            embed.addFields(
                {
                    name: '📈 Uso de Recursos',
                    value: [
                        `**CPU:** ${server.cpu ?? '-'}%`,
                        `**RAM:** ${server.mem ?? '-'}`,
                        `**RAM %:** ${server.memPercent ?? '-'}%`,
                    ].join('\n'),
                    inline: false
                },
                {
                    name: '⚙️ Runtime',
                    value: [
                        `**Versão:** ${server.version ?? '-'}`,
                        server.startedAt
                            ? `**Iniciado em:** ${new Date(server.startedAt).toLocaleString('pt-BR')}`
                            : null
                    ].filter(Boolean).join('\n'),
                    inline: false
                }
            )
        }

        const alerts = []
        if (server.crashed) alerts.push('⚠️ **Crashed**')
        if (server.updating) alerts.push('🔄 **Atualizando**')
        if (server.waitingStart) alerts.push('⏳ **Aguardando início**')

        if (alerts.length > 0) {
            embed.addFields({
                name: '🚨 Avisos',
                value: alerts.join('\n'),
                inline: false
            })
        }

        embed.setTimestamp()

        await interaction.editReply({
            embeds: [embed],
            components: []
        })
    } catch (error) {
        console.error(error)
        await interaction.editReply({
            content: '❌ Erro ao buscar informações do servidor.'
        })
    }
}
