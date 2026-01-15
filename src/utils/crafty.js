import apiService from "../api/apiService.js"
import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js"

export async function getServers() {
    try {
        const servers = await apiService.get("/api/v2/servers")
        return servers.data.data
    } catch (error) {
        console.error("Failed to fetch servers:", error)
        throw error
    }
}

export async function getServer(id) {
    try {
        const server = await apiService.get(`/api/v2/servers/${id}`)
        return server.data.data
    } catch (error) {
        console.error(`Failed to fetch server ${id}:`, error)
        throw error
    }
}

export async function sendConsoleCommand(id, command) {
    try {
        console.log(`Sending command "${command}" to server ${id}`)

        return response.data
    } catch (error) {
        console.error(`Failed to send command to server ${id}:`, error)
        throw error
    }
}

export async function startServer(id) {
    try {
        const response = await apiService.post(`/api/v2/servers/${id}/action/start_server`)
        return response.data
    } catch (error) {
        console.error(`Failed to start server ${id}:`, error)
        throw error
    }
}

export async function stopServer(id) {
    try {
        const response = await apiService.post(`/api/v2/servers/${id}/action/stop_server`)
        return response.data
    } catch (error) {
        console.error(`Failed to stop server ${id}:`, error)
        throw error
    }
}

export function generateServerSelectMenu(servers, action) {
    const select = new StringSelectMenuBuilder()
        .setCustomId(`server_select:${action}`)
        .setPlaceholder('Selecione um servidor')
        .addOptions(
            servers.map(server =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(server.name)
                    .setDescription(
                        `${server.running ? '🟢 Online' : '🔴 Offline'} • ${server.type}`
                    )
                    .setValue(server.serverId)
            )
        )

    return new ActionRowBuilder().addComponents(select)
}


export async function getServersWithStats() {
    try {
        const res = await apiService.get("/api/v2/servers")
        const servers = res.data.data

        const serversWithStats = await Promise.all(
            servers.map(async (server) => {
                try {

                    try {

                        const statsRes = await apiService.get(
                            `/api/v2/servers/${String(server.server_id)}/stats`, { contentType: 'application/json' }
                        )
                        const stats = statsRes.data.data

                        return {
                            serverId: server.server_id,
                            name: server.server_name,
                            type: server.type,

                            running: stats.running,
                            crashed: stats.crashed,
                            updating: stats.updating,
                            waitingStart: stats.waiting_start,

                            cpu: stats.cpu,
                            mem: stats.mem,
                            memPercent: stats.mem_percent,

                            onlinePlayers: stats.online,
                            maxPlayers: stats.max,

                            startedAt: stats.started,
                            version: stats.version,
                        }
                    } catch (err) {
                        console.error(err)
                    }

                } catch (err) {
                    return {
                        serverId: server.server_id,
                        name: server.server_name,
                        type: server.type,
                        running: false,
                        error: true,
                    }
                }
            })
        )

        return serversWithStats
    } catch (error) {
        console.error("Failed to fetch servers with stats:", error)
        throw error
    }
}
