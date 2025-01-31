const axios = require("axios");
const Transaction = require("../models/transactionModel");
const ACCOUNT_SERVICE_URL = "http://localhost:3002/accounts";

exports.transfer = async (req, res) => {
  const { accountSource, accountTarget, amount } = req.body;

  try {
    // Validate amount is a positive number
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Fetch source account
    const sourceResponse = await axios.get(
      `${ACCOUNT_SERVICE_URL}/${accountSource}`
    );
    const accountSourceData = sourceResponse.data;
    const sourceBalance = parseFloat(accountSourceData.balance);
    if (isNaN(sourceBalance)) {
      throw new Error("Invalid source balance");
    }

    // Check sufficient balance
    if (sourceBalance < amountNum) {
      return res
        .status(400)
        .json({ error: "Insufficient funds in source account" });
    }

    // Fetch target account
    const targetResponse = await axios.get(
      `${ACCOUNT_SERVICE_URL}/${accountTarget}`
    );
    const accountTargetData = targetResponse.data;
    const targetBalance = parseFloat(accountTargetData.balance);
    if (isNaN(targetBalance)) {
      throw new Error("Invalid target balance");
    }

    // Calculate new balances
    const newSourceBalance = sourceBalance - amountNum;
    const newTargetBalance = targetBalance + amountNum;

    // Update source and target accounts
    await axios.patch(`${ACCOUNT_SERVICE_URL}/updateAccountBalance/${accountSource}`, {
      balance: newSourceBalance.toFixed(2), // Ensure two decimal places as string if needed
    });

    await axios.patch(`${ACCOUNT_SERVICE_URL}/updateAccountBalance/${accountTarget}`, {
      balance: newTargetBalance.toFixed(2),
    });

    // Create transaction
    const transaction = await Transaction.create({
      accountSource,
      accountTarget,
      amount: amountNum,
    });

    res.status(201).json({
      message: "Transfer successful",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// // Get transactions where the user sent money
exports.getTransactionsSentMoney = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.findAll({
      where: { accountSource: userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving sent transactions" });
  }
};
exports.getTransactionsReceivedMoney = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.findAll({
      where: { accountTarget: userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving sent transactions" });
  }
};
