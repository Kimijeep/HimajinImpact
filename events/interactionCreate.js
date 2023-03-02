/* eslint-disable no-shadow */
const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
			const button = interaction.client.b_commands.get(interaction.customId);

			if (!button) {
				console.error(`No command matching ${interaction.customId} was found.`);
				return;
			}
			try {
				await button.execute(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.customId}`);
				console.error(error);
			}
		}
		else if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
	},
};