const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('affiliate_set')
		.setDescription('有効なアフィリエイトリンクを登録します')
		.addUserOption(option =>
			option.setName('url')
				.setDescription('有効なアフィリエイトリンクを入力してください。')
				.setRequired(true))
		.addUserOption(option =>
			option.setName('value')
				.setDescription('このアフィリエイトリンクの1クリックの単価を入力してください')
				.setRequired(true)),
	async execute(interaction) {
		
	},
};