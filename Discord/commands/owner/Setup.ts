import { SlashCommandBuilder, CommandInteraction, ButtonBuilder, EmbedBuilder, ActionRowBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder, PermissionFlagsBits, ButtonStyle, ActionRow, ButtonComponent, ActionRowComponent, MessageFlags, ComponentType, Component } from "discord.js";
import EmbedCreator from "../../functions/EmbedCreator";
import { ButtonCreator } from "../../functions/ButtonCreator";
import { SetupTypes } from "../../interfaces/SetupSettings";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setup the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: CommandInteraction) {

        const start = await ButtonCreator('start', 'Start', ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(start);

        const setupSettings: SetupTypes = {
            guildId: interaction.guildId,
            modrole: null,
            staffChannel: null,
            joinRole: null
        }

        const response = await interaction.reply({  embeds: [EmbedCreator('Setup', 'This will take you through a simple server setup for your server!')], components: [row], flags: MessageFlags.Ephemeral });

        const collector = await response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60_000 * 5});
        const roleSelectMenuCollector = await response.createMessageComponentCollector({ componentType: ComponentType.RoleSelect})

        collector.on('collect', async (i) => {

            if (i.customId === 'start') {
                
                const roleRow = new ActionRowBuilder<RoleSelectMenuBuilder>()
                    .addComponents(new RoleSelectMenuBuilder()
                        .setCustomId('mod')
                        .setPlaceholder('Pick a mod role')
                        .setMinValues(1)
                        .setMaxValues(1)
                        .setDisabled(false));

                const channelRow = new ActionRowBuilder<ChannelSelectMenuBuilder>()
                    .addComponents(new ChannelSelectMenuBuilder())

                const button: ButtonBuilder = ButtonCreator('createone', 'Create one for me', ButtonStyle.Primary);
                
                const row2 = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(button)

                await i.update({ embeds: [EmbedCreator('Setup', 'Choose a staff role')], components: [roleRow, row2] });
            }
        })

        roleSelectMenuCollector.on('collect', async (i) => {
            
            if(i.customId === 'mod') {

                if(!i.values[0]) return i.update({ embeds: [EmbedCreator('Setup', 'An error ocurred during setup!')] });

                const role = i.values[0];

                setupSettings.modrole = role;

                const ModChannelSelector = new ChannelSelectMenuBuilder()
                    .setCustomId('modchannel')
                    .setPlaceholder('Pick a mod channel')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .setDisabled(false);

                const channelRow = new ActionRowBuilder<ChannelSelectMenuBuilder>()
                    .addComponents(ModChannelSelector)

                await i.update({ embeds: [EmbedCreator('Setup', 'Choose a mod channel')], components: [channelRow] });
            }
        })
    }
}