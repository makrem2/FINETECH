const axios = require("axios");
const Transaction = require("../models/transactionModel");
const ACCOUNT_SERVICE_URL = "http://localhost:3002/accounts";

exports.transfer = async (req, res) => {
  const { accountSource, accountTarget, amount } = req.body;

  try {
    const sourceResponse = await axios.get(
      `${ACCOUNT_SERVICE_URL}/${accountSource}`
    );
    const accountSourceData = sourceResponse.data;

    const targetResponse = await axios.get(
      `${ACCOUNT_SERVICE_URL}/${accountTarget}`
    );
    const accountTargetData = targetResponse.data;

    if (accountSourceData.balance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient funds in source account" });
    }

    await axios.patch(`${ACCOUNT_SERVICE_URL}/${accountSource}`, {
      balance: accountSourceData.balance - amount,
    });

    await axios.patch(`${ACCOUNT_SERVICE_URL}/${accountTarget}`, {
      balance: accountTargetData.balance + amount,
    });

    const transaction = await Transaction.create({
      accountSource,
      accountTarget,
      amount,
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
