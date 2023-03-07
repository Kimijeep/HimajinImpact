const { Events, ActivityType } = require('discord.js');
const { Users } = require('../dbObjects.js');
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const storedBalances = await Users.findAll();
		storedBalances.forEach(b => client.currency.set(b.user_id, b));
		client.user.setPresence({
			activities: [{
				name: 'ﾊﾞﾅﾅ',
				type: ActivityType.Listening }],
			status: 'dnd',
		});
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.guilds.cache.get('835801476822728744')
			.channels.cache.get('1078738006720118855')
			.send(`Ready! Logged in as ${client.user.tag}`);
	},
};