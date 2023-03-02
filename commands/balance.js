const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('ユーザーの残高を表示します。')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('指定するユーザーを入力します')
				.setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		await interaction.reply(`${target.tag} の所持ポイント： ${interaction.client.currency.getBalance(target.id)}.pt`);
	},
};