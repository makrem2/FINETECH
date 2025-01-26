const createDatabaseConnection = require('../shared/utils/db');
const { DataTypes } = require('sequelize');

const sequelize = createDatabaseConnection('auth_service');

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

sequelize.sync();

module.exports = User;
