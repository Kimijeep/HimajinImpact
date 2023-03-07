const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

const invitetime = new ActionRowBuilder()
	.setComponents(
		new ButtonBuilder()
			.setCustomId('1hour')
			.setLabel('1時間')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('6hour')
			.setLabel('6時間')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('12hour')
			.setLabel('12時間')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('1day')
			.setLabel('1日')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('7day')
			.setLabel('7日')
			.setStyle(ButtonStyle.Primary),
	);


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
		const option_time = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('招待のオプションを指定してください\n')
			.setDescription('招待の継続時間を指定してください。');
		const options_time = await interaction.followUp({
			embeds: [option_time],
			components: [invitetime],
		});
		const collector = options_time.createMessageComponentCollector({ componentType: ComponentType.Button, time: 30000 });
		collector.on('collect', async i => {
			if (i.user.id === interaction.user.id) return;
			if (i.customId === '1hour') {
				const button = require('./1hour');
				try {
					await button.execute(interaction);
				}
				catch (error) {
					console.error(`Error executing ${interaction.commandName}`);
					console.error(error);
				}
				return;
			}
			if (i.customId === '') {
				const button = require('');
				try {
					await button.execute(interaction);
				}
				catch (error) {
					console.error(`Error executing ${interaction.commandName}`);
					console.error(error);
				}
				return;
			}
			if (i.customId === '') {
				const button = require('');
				try {
					await button.execute(interaction);
				}
				catch (error) {
					console.error(`Error executing ${interaction.commandName}`);
					console.error(error);
				}
				return;
			}
			if (i.customId === '') {
				const button = require('');
				try {
					await button.execute(interaction);
				}
				catch (error) {
					console.error(`Error executing ${interaction.commandName}`);
					console.error(error);
				}
				return;
			}
			if (i.customId === '') {
				const button = require('');
				try {
					await button.execute(interaction);
				}
				catch (error) {
					console.error(`Error executing ${interaction.commandName}`);
					console.error(error);
				}
				return;
			}
			else {
				i.followUp({
					content: '応答待機時間がタイムアウトしたため、招待生成を終了します。',
					ephemeral: true,
				});
			}
		});
	},
};