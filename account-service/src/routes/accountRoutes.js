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

router.get("/:id", getAccountById);

router.patch("/:id", updateAccountBalance);

module.exports = router;
