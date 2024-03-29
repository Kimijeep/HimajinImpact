const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);
require('./models/affiliatepool.js')(Sequelize.UUID, sequelize, Sequelize.DataTypes);
require('./models/invitedata.js')(Sequelize.UUID, sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'テスト１', cost: 1000 }),
		CurrencyShop.upsert({ name: 'テスト２', cost: 200 }),
		CurrencyShop.upsert({ name: 'テスト３', cost: 56000 }),
	];

	await Promise.all(shop);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);