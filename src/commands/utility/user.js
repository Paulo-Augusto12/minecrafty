import { SlashCommandBuilder } from "discord.js";

async function execute(interaction) {
    await interaction.reply(
        `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
    )
}

const user = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user info"),
    execute
}

export default user


