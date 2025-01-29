import { EmbedBuilder } from "discord.js";

export default function EmbedCreator (title: string, description: string) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(0x0099ff)
        .setTimestamp()
    
    return embed;
}