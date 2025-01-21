const axios = require("axios");
const Transaction = require("../models/transactionModel"); // Transaction model
const ACCOUNT_SERVICE_URL = "http://localhost:3002/accounts"; // Account Service base URL

exports.transfer = async (req, res) => {
  const { accountSource, accountTarget, amount } = req.body;

  try {
    // 1. Fetch accountSource details
    const sourceResponse = await axios.get(
      `${ACCOUNT_SERVICE_URL}/${accountSource}`
    );
    const accountSourceData = sourceResponse.data;

    // 2. Fetch accountTarget details
    const targetResponse = await axios.get(
      `${ACCOUNT_SERVICE_URL}/${accountTarget}`
    );
    const accountTargetData = targetResponse.data;

    // 3. Check if the source account has sufficient balance
    if (accountSourceData.balance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient funds in source account" });
    }

    // 4. Update account balances via Account Service
    await axios.patch(`${ACCOUNT_SERVICE_URL}/${accountSource}`, {
      balance: accountSourceData.balance - amount,
    });

    await axios.patch(`${ACCOUNT_SERVICE_URL}/${accountTarget}`, {
      balance: accountTargetData.balance + amount,
    });

    // 5. Create transaction record
    const transaction = await Transaction.create({
      accountSource,
      accountTarget,
      amount,
    });

    // 6. Return success response
    res.status(201).json({
      message: "Transfer successful",
      transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
