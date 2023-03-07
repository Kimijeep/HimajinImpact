// web server
const port = 3000;
const express = require('express');
const app = express();

app.get('/', (request, response) => {
	response.send('<h1>Hello Express.js!</h1>');
}).listen(port, () => {
	console.log(`The server has started and is listening on port number: ${port}`);
});

// discord server
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const token = process.env.DISCORD_TOKEN;


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();
client.messages = new Collection();
client.currency = new Collection();
client.b_commands = new Collection();


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const messagesPath = path.join(__dirname, 'messages');
const messagesFiles = fs.readdirSync(messagesPath).filter(file => file.endsWith('.js'));
const b_commandsPath = path.join(__dirname, 'button/commands');
const b_commandFiles = fs.readdirSync(b_commandsPath).filter(file => file.endsWith('.js'));

// loading command files
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// コマンド名をキー、エクスポートされたモジュールを値とする新しい項目を Collection に設定
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

for (const file of b_commandFiles) {
	const filePath = path.join(b_commandsPath, file);
	const command = require(filePath);
	// コマンド名をキー、エクスポートされたモジュールを値とする新しい項目を Collection に設定
	if ('data' in command && 'execute' in command) {
		client.b_commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

for (const file of messagesFiles) {
	const filePath = path.join(messagesPath, file);
	const message = require(filePath);

	if ('name' in message && 'execute' in message) {
		client.messages.set(message.name, message);
	}
	else {
		console.log(`[WARNING] The r_message at ${filePath} is missing a required "name" or "execute" property.`);
	}
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const { Users } = require('./dbObjects.js');

Reflect.defineProperty(client.currency, 'addBalance', {
	value: async function addBalance(id, amount) {
		const user = client.currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		client.currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(client.currency, 'getBalance', {
	value: function getBalance(id) {
		const user = client.currency.get(id);
		return user ? user.balance : 0;
	},
});

// Log in to Discord with your client's token
client.login(token);