const createDatabaseConnection = require('../shared/utils/db');
const { DataTypes } = require('sequelize');

// Create connection
const sequelize = createDatabaseConnection('auth_service');

// Define User model
const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

// Sync the model with the database
sequelize.sync();

module.exports = User;
