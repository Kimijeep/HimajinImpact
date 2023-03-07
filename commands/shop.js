const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { CurrencyShop } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('ショップで交換した物を表示します。'),
	async execute(interaction) {
		const items = await CurrencyShop.findAll();
		return interaction.reply('商品番号： 商品名... コスト' +
			codeBlock(items.map(i =>
				`${i.id.toString().padStart(8, '0')}: ${i.name} ...${i.cost}pt`).join('\n')));
	},
};