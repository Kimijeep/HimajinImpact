const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('あなたのポラリス通貨(point)を特定のユーザーに転送します')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('転送量を指定してください。')
				.setRequired(true))
		.addUserOption(option =>
			option.setName('user')
				.setDescription('指定するユーザーを入力します')
				.setRequired(true)),
	async execute(interaction) {
		const currentAmount = interaction.client.currency.getBalance(interaction.user.id);
		const transferAmount = interaction.options.getInteger('amount');
		const transferTarget = interaction.options.getUser('user');

		if (transferAmount > currentAmount) return interaction.reply(`${interaction.user}、あなたの所持ポイントは ${currentAmount} しかありません。`);
		if (transferAmount <= 0) return interaction.reply(`${interaction.user}、0以下を入力しないでください。殺4ますよ？ポイントすべて剥奪しましょうか？`);

		interaction.client.currency.addBalance(interaction.user.id, -transferAmount);
		interaction.client.currency.addBalance(transferTarget.id, transferAmount);

		return interaction.reply(`送金額 ${transferAmount}.pt を ${transferTarget.tag} へ転送しました。転送後のあなたの所持pt: ${interaction.client.currency.getBalance(interaction.user.id)}.pt`);
	},
};