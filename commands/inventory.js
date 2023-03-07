const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('ショップで交換した物を表示します。')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('指定するユーザーを入力します')
				.setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return interaction.reply(`${target.tag}は何も持っていません。`);

		return interaction.reply(`${target.tag}の所持アイテム内容：${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	},
};