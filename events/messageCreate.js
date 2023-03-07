const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {

		// ボットのメッセージ、システムのメッセージは除外
		if (message.author.bot || message.system) return;

		// 事前にセットされているメッセージ内容をゲットした場合それをr_messageと定義
		const r_message = message.client.messages.get(message.content);

		// r_messageの内容がない場合のログ
		if (!r_message) {
			console.log(`${message.author.username}#${message.author.discriminator} [${message.guild.name}] : ${message.content}`);
			return;
		}

		// 条件を満たしたメッセージに対する処理
		try {
			await r_message.execute(message);
		}
		catch (error) {
			console.error(`Error executing ${message.content}`);
			console.error(error);
		}
	},
};