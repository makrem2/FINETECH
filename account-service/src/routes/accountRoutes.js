const express = require("express");
const {
  createAccount,
  getAccountsByUser,
  updateAccountBalance,
  getAccountById,
  suspendedAccount,
  closedAccount,
  activateAccount,
} = require("../controllers/accountController");
const router = express.Router();

router.post("/", createAccount);

router.get("/getAccountsByUser/:userId", getAccountsByUser);

router.get("/:id", getAccountById);

router.patch("/updateAccountBalance/:id", updateAccountBalance);


router.put("/activateAccount/:id", activateAccount);

router.put("/suspendedAccount/:id", suspendedAccount);

router.put("/closedAccount/:id", closedAccount);

module.exports = router;
