const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite_a')
		.setDescription('inviteの続き'),
	async execute(interaction) {
		const option_premise = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('新規URLを作成します。');
		await interaction.reply({
			embeds: [option_premise],
		});
	},
};