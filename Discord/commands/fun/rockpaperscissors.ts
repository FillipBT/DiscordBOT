import { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } from "discord.js";
import { ButtonCreator } from "../../functions/ButtonCreator";
 
module.exports = {
   data: new SlashCommandBuilder()
      .setName("rockpaperscissors")
      .setDescription("Play a game of rock paper scissors"),
      
      async execute (interaction: CommandInteraction) {

        const rock = await ButtonCreator('rock', '🪨', ButtonStyle.Primary);

        const paper = await ButtonCreator('paper', '📄', ButtonStyle.Primary);

        const scissors = await ButtonCreator('scissors', '✂️', ButtonStyle.Primary);
        
        
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(rock, paper, scissors);

        await interaction.reply({
            content: 'Wanna play Rock, Paper, Scissors?',
            components: [row]
        })
        




    }
}