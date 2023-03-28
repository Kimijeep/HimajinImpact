module.exports = (UUID, sequelize, DataTypes) => {
	return sequelize.define('affiliate_pool', {
		affiliate_id: {
			allowNull: false,
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		affiliate_url: {
			type: DataTypes.STRING,
		},
		affiliate_value: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};