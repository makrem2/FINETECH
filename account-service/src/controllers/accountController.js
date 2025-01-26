const Account = require("../models/accountModel");

exports.createAccount = async (req, res) => {
  const { userId, balance } = req.body;
  try {
    const account = await Account.create({ userId, balance });
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
      const account = await Account.findByPk(req.params.id);
      if (!account) {
          return res.status(404).json({ error: 'Account not found' });
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
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateAccountBalance = async (req, res) => {
  try {
      const account = await Account.findByPk(req.params.id);
      if (!account) {
          return res.status(404).json({ error: 'Account not found' });
      }

      account.balance = req.body.balance;
      await account.save();

      res.status(200).json({ message: 'Account updated successfully', account });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
