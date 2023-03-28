module.exports = (UUID, sequelize, DataTypes) => {
	return sequelize.define('invite_data', {
		invite_id: {
			allowNull: false,
			primaryKey: true,
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		invite_url: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		invite_user: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		invite_temporary: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		invite_maxage: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		invite_maxuses: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};