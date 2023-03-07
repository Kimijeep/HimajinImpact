const { SlashCommandBuilder } = require('discord.js');
// const ytdl = require('ytdl-core');
// const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Youtubeの動画URLから音声データを再生します。')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('読み取るURLを指定します。')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('この機能はまだ準備中です。');

		// const url = interaction.options.getString('url');
		// if (!ytdl.validateURL(url)) return interaction.reply(`${url}は処理できません。`);

		// const channel = interaction.member.voice.channel;
		// console.log(channel);
		// if (!channel) return interaction.reply('先にボイスチャンネルに参加してください！');

		// const connection = joinVoiceChannel({
		// 	adapterCreator: channel.guild.voiceAdapterCreator,
		// 	channelId: channel.id,
		// 	guildId: channel.guild.id,
		// 	selfDeaf: true,
		// 	selfMute: false,
		// });
		// const player = createAudioPlayer();
		// connection.subscribe(player);
		// // 動画の音源の取得
		// const stream = ytdl(ytdl.getURLVideoID(url), {
		// 	filter: format => format.audioCodec === 'opus' && format.container === 'webm',
		// 	quality: 'high',
		// 	highWaterMark: 32 * 1024 * 1024,
		// });
		// const resource = createAudioResource(stream, {
		// 	inputType: StreamType.WebmOpus,
		// });
		// // 再生
		// player.play(resource);
		// await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
		// await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);
		// // 再生が終了したら抜ける
		// connection.destroy();
	},
};