const express = require("express");
const {
  createAccount,
  getAccountsByUser,
  updateAccountBalance,
  getAccountById,
} = require("../controllers/accountController");
const router = express.Router();

router.post("/", createAccount);
router.get("/:userId", getAccountsByUser);

// Get account by ID
router.get("/:id", getAccountById);

// Update account balance
router.patch("/:id", updateAccountBalance);

module.exports = router;
