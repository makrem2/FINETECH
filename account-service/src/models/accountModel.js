const createDatabaseConnection = require("../shared/utils/db");
const { DataTypes } = require("sequelize");

const sequelize = createDatabaseConnection("account_service");

const Account = sequelize.define("Account", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  accountType: { type: DataTypes.STRING, allowNull: false },
  balance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.0 },
});

sequelize.sync();

module.exports = Account;
