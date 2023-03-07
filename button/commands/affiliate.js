const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('affiliate')
		.setDescription('アフィリエイトリンクを発行します'),
	async execute(interaction) {
		await interaction.reply('有効なアフィリエイトリンクが存在しません。');
	},
};