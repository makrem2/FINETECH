const Account = require("../models/accountModel");

exports.createAccount = async (req, res) => {
  const { userId, balance, accountType } = req.body;
  try {
    const account = await Account.create({ userId, balance, accountType });
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (account.status === "suspended") {
      return res.status(404).json({ error: "Your account is suspended " });
    }
    if (account.status === "closed") {
      return res.status(404).json({ error: "Your account is closed " });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const accounts = await Account.findAll({ where: { userId } });

    if (!accounts.length) {
      return res.status(404).json({ error: "No accounts found for this user." });
    }

    const suspendedAccount = accounts.find(account => account.status === "suspended");
    const closedAccount = accounts.find(account => account.status === "closed");

    if (suspendedAccount) {
      return res.status(403).json({ error: "Your account is suspended." });
    }

    if (closedAccount) {
      return res.status(403).json({ error: "Your account is closed." });
    }

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAccountBalance = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (account.status === "suspended") {
      return res.status(404).json({ error: "Your account is suspended " });
    }
    if (account.status === "closed") {
      return res.status(404).json({ error: "Your account is closed " });
    }

    account.balance = req.body.balance;
    await account.save();

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.suspendedAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    account.status = "suspended";
    await account.save();

    res.status(200).json({ message: "Account Suspended successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.closedAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    account.status = "closed";
    await account.save();

    res.status(200).json({ message: "Account Closed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    account.status = "active";
    await account.save();

    res.status(200).json({ message: "Account activated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
