const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get the info of the server')
        .setDMPermission(false),

    async execute(interaction, client) {
        const { guild } = interaction

        const { createdTimestamp, ownerId, memberCount, emojis, roles, stickers, channels } = guild
        const icon = guild.iconURL()
        const totEmoji = 'None' || emojis.cache.map(e => e.toString())
        const totRoles = 'None' || roles.cache.map(e => e.toString())

        const serverinfoEmbed = new EmbedBuilder()
        .setColor(0x0089D8)
        .setAuthor({
            name: `${guild.name} Info`,
            iconURL: icon
        })
        .setThumbnail(icon)
        .addFields(
            { name: `**Server Name**:`, value: guild.name, inline: true },
            { name: `**Server ID:**`, value: guild.id, inline: true },
            { name: `**Server Owner:**`, value: `<@${ownerId}>`, inline: true },
            { name: `**Server Created:**`, value: `<t:${parseInt(createdTimestamp / 1000)}:R>`, inline: true },
            { name: `**Members In Server:**`, value: `${memberCount}`, inline: true },
            { name: `\u200B`, value: `\u200B`, inline: true },
            { name: `**Boost Count:**`, value: `${guild.premiumSubscriptionCount}`, inline: true },
            { name: `**Boost Tier:**`, value: `${guild.premiumTier}`, inline: true },
            { name: `\u200B`, value: `\u200B`, inline: true },
            { name: `**Emojis In Server:**`, value: `${'0' || emojis.cache.size}\nAnimated: ${'0' || emojis.cache.filter(emoji => emoji.animated).size}\nNormal: ${'0' || emojis.cache.filter(emoji => !emoji.animated).size}`, inline: true },            
            { name: `**Emojis:**`, value: `${totEmoji}`, inline: true },
            { name: `Stickers In Server:`, value: `${'0' || stickers.cache.size}`, inline: true },
            { name: `**Roles In Server:**`, value: `${roles.cache.size - 1}`, inline: true },
            { name: `**Roles:**`, value: `${totRoles}`, inline: true },
            { name: `**Highest Role:**`, value: `${roles.highest}`, inline: true },
            { name: `**Server Stats:**`, value: `Total: ${channels.cache.size}\n${channels.cache.filter(channel => channel.type === ChannelType.GuildText).size} ⌨️\n${channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size} 🔈\n${channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size} 📢\n${channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size} 📁`},
        )
        .setFooter({
            text: guild.name,
            iconURL: icon
        })

        await interaction.deferReply({ fetchReply: true })
        await interaction.editReply({ embeds: [serverinfoEmbed] })

    }
}
