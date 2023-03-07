const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const information = new ActionRowBuilder()
	.setComponents(
		new ButtonBuilder()
			.setCustomId('affiliate')
			.setLabel('アフィリエイト')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('lottery')
			.setLabel('ガチャを回す')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('transfer')
			.setLabel('ポイントを転送')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('invite')
			.setLabel('友達を招待')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('request')
			.setLabel('ご要望')
			.setStyle(ButtonStyle.Primary),
	);

const controlpanel = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setURL('https://twitter.com/polaris_server')
			.setLabel('コントロールパネルを開く')
			.setStyle(ButtonStyle.Link),
	);

const helpEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('ぽらりすinformation')
	.setURL('https://twitter.com/polaris_server')
	.setAuthor({ name: 'Polaris', iconURL: 'https://pbs.twimg.com/profile_images/1621224374392205312/-o39dEPQ_400x400.jpg', url: 'https://twitter.com/polaris_server' })
	.setDescription('これはデモ版です。\n\n\n コマンド一覧')
	.addFields(
		{ name: 'アフィリエイト', value: '\nアフィリエイトを使用します。\n アフィリエイト広告の条件を満たすとポイント(ぽらりす通貨)が付与されます。', inline: true },
		{ name: 'ガチャを回す', value: '\nポイント(ぽらりす通貨)を消費してガチャを回すことができます。\n このシステムはまだ未開発です。', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'ポイントを転送', value: '\nポイント(ぽらりす通貨)を指定したユーザーに転送できます。', inline: true },
		{ name: '友達を招待', value: '\n招待URLを生成します。', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'ご要望', value: '\n何か物申したいことがあればこちらからも申し立てることができます。', inline: true },
		{ name: '\u200B', value: '\u200B', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '以下に表示されるボタンからコマンドを実行できます。', value: '該当する項目を押してください。' },
	)
	.setTimestamp()
	.setFooter({ text: 'Copyright © 2023 ✵ぽらりす✵㊑ Inc. All Rights Reserved.', iconURL: 'https://pbs.twimg.com/profile_images/1621224374392205312/-o39dEPQ_400x400.jpg' });


module.exports = {
	name: '<@1065509870213812285>',
	async execute(message) {
		message.reply({ embeds: [helpEmbed], components: [information, controlpanel] });
	},
};