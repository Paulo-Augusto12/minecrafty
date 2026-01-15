import { codeBlock, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import apiService from "../../api/apiService.js";

async function getApiData() {
    try {
        const apiData = await apiService.get("/api/v2")
        return apiData.data
    } catch (error) {
        console.error(error)
    }
}

async function getHostData() {
    try {
        const hostData = await apiService.get("/metrics/host")
        return hostData.data
    } catch (error) {
        console.error(error)
    }
}
async function execute(interaction) {
    const apiData = await getApiData()
    const hostData = await getHostData()


    const embed = new EmbedBuilder()
        .setTitle('📡 Dados da API')
        .setColor(0x2b2d31)
        .addFields(
            {
                name: 'API Response',
                value: '```json\n' + JSON.stringify(apiData.data, null, 2) + '\n```'
            },
            {
                name: 'Host Data',
                value: '```plain\n' + hostData + '\n```'
            }
        )
    return interaction.reply({
        embeds: [embed]
    })
}

const statusCommand = new SlashCommandBuilder()
    .setName("status")
    .setDescription("Check the status of the host")

export default {
    data: statusCommand,
    execute
}