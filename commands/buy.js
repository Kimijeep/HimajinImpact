const { SlashCommandBuilder } = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('ショップで交換した物を表示します。')
		.addStringOption(option =>
			option.setName('item')
				.setDescription('指定する商品名を入力してください。')
				.setRequired(true)),
	async execute(interaction) {
		const itemName = interaction.options.getString('item');
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

		if (!item) return interaction.reply('そのアイテムは存在しません。');
		if (item.cost > interaction.client.currency.getBalance(interaction.user.id)) {
			return interaction.reply(`おまえ、 ${interaction.client.currency.getBalance(interaction.user.id)} しか持ってねえのに ${item.name} 買うつもりだったんか？ ${item.cost}.pt しっかり用意しろよボケ！`);
		}

		const user = await Users.findOne({ where: { user_id: interaction.user.id } });
		interaction.client.currency.addBalance(interaction.user.id, -item.cost);
		await user.addItem(item);

		return interaction.reply(`交換した商品: ${item.name}.`);
	},
};