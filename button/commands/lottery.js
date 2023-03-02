const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lottery')
		.setDescription('ガチャを回して、景品を得ることができます。'),
	async execute(interaction) {
		await interaction.reply('有効なアフィリエイトリンクが存在しません。');
	},
};