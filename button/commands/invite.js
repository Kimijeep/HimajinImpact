const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');
const invite_a = require('./invite_a');

// const invitetype = new ActionRowBuilder()
// 	.setComponents(
// 		new ButtonBuilder()
// 			.setCustomId('temporary_invite')
// 			.setLabel('一時的な招待')
// 			.setStyle(ButtonStyle.Primary),
// 		new ButtonBuilder()
// 			.setCustomId('Formal_invite')
// 			.setLabel('正式な招待')
// 			.setStyle(ButtonStyle.Primary),
// 	);

// const invitetime = new ActionRowBuilder()
// 	.setComponents(
// 		new ButtonBuilder()
// 			.setCustomId('1hour')
// 			.setLabel('1時間')
// 			.setStyle(ButtonStyle.Primary),
// 		new ButtonBuilder()
// 			.setCustomId('6hour')
// 			.setLabel('6時間')
// 			.setStyle(ButtonStyle.Primary),
// 		new ButtonBuilder()
// 			.setCustomId('12hour')
// 			.setLabel('12時間')
// 			.setStyle(ButtonStyle.Primary),
// 		new ButtonBuilder()
// 			.setCustomId('1day')
// 			.setLabel('1日')
// 			.setStyle(ButtonStyle.Primary),
// 		new ButtonBuilder()
// 			.setCustomId('7day')
// 			.setLabel('7日')
// 			.setStyle(ButtonStyle.Primary),
// 	);

const yorn = new ActionRowBuilder()
	.setComponents(
		new ButtonBuilder()
			.setCustomId('invite_a')
			.setLabel('はい')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('not')
			.setLabel('いいえ')
			.setStyle(ButtonStyle.Primary),
	);


// const option_1 = new EmbedBuilder()
// 	.setColor(0x0099FF)
// 	.setTitle('招待のオプションを指定してください\n')
// 	.setDescription('一時的な招待か正式な招待か設定してください。\n`招待で参加したメンバーが24時間後にまだ役割を受け取っていない場合、自動的にキックされるようにするかどうか`');

// const option_2 = new EmbedBuilder()
// 	.setColor(0x0099FF)
// 	.setTitle('招待のオプションを指定してください\n')
// 	.setDescription('招待の継続時間を指定してください。');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('招待URLを発行します。'),
	async execute(interaction) {


		const invites = await interaction.guild.invites.fetch();
		const inv = invites.map(invite => invite.inviter.id);
		if (inv.includes(interaction.user.id)) {
			const inviters = invites.filter(function(target) {
				return target.inviterId == interaction.user.id;
			});
			const invurl = inviters.map(invite => invite.url);
			const option_premise = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('あなたは以前に招待URLを作成しています。')
				.setDescription('さらに作成しますか？')
				.setFields({ name: '現在発行済みURL', value: `${invurl}` });
			const options_premise = await interaction.reply({
				embeds: [option_premise],
				components: [yorn],
			});
			const collector = options_premise.createMessageComponentCollector({ componentType: ComponentType.Button, time: 30000 });
			collector.on('collect', i => {
				if (i.user.id === interaction.user.id) return;
				if (i.customId === 'not') {
					i.followUp({
						content: '招待生成をキャンセルしました。',
					});
					return;
				}
				else {
					i.reply({
						content: '応答待機時間がタイムアウトしたため、招待生成を終了します。',
						ephemeral: true,
					});
				}
			});
		}
		else {
			const button = interaction.client.b_commands.get(invite_a);

			if (!button) {
				console.error(`No command matching ${interaction.customId} was found.`);
				return;
			}
			try {
				await button.execute(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
	},
};

//

// const options_1 = await interaction.reply({
// 	embeds: [option_1],
// 	components: [invitetype],
// });
// const collector = options_1.createMessageComponentCollector({ componentType: ComponentType.Button, time: 30000 });
// collector .on('collect', i => {
// 	if (i.user.id !== interaction.user.id) return;
// 	if (i.customId === 'temporary_invite') {
// 		i.followUp({
// 			embeds: [option_2],
// 			components: [invitetime],
// 		});
// 	}
// 	else {
// 		i.followUp({
// 			content: '応答待機時間がタイムアウトしたため、招待生成を終了します。',
// 		});
// 	}
// });


// const invite = await interaction.channel.createInvite();
// interaction.reply(invite.url);
