const createDatabaseConnection = require("../shared/utils/db");
const { DataTypes } = require("sequelize");

const sequelize = createDatabaseConnection("transaction_service");

const Transaction = sequelize.define("Transaction", {
  accountSource: { type: DataTypes.INTEGER, allowNull: false },
  accountTarget: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  transactionType: {
    type: DataTypes.ENUM("transfer", "deposit", "withdrawal"),
    allowNull: false,
  },
});

sequelize.sync();

module.exports = Transaction;
