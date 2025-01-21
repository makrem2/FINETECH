const createDatabaseConnection = require('../shared/utils/db');
const { DataTypes } = require('sequelize');

// Create connection
const sequelize = createDatabaseConnection('transaction_service');

// Define Transaction model
const Transaction = sequelize.define('Transaction', {
    accountSource: { type: DataTypes.INTEGER, allowNull: false },
    accountTarget: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
});

// Sync the model with the database
sequelize.sync();

module.exports = Transaction;
