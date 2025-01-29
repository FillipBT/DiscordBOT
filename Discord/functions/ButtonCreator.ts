import { ButtonBuilder } from "discord.js";

export function ButtonCreator(customId: string, label: string, style: any) {
    const button = new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style);
    return button;
}