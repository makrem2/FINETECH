const createDatabaseConnection = require("../shared/utils/db");
const { DataTypes } = require("sequelize");

// Create connection
const sequelize = createDatabaseConnection("account_service");

// Define Account model
const Account = sequelize.define("Account", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  balance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.0 },
});

// Sync the model with the database
sequelize.sync();

module.exports = Account;
