const express = require("express");
const axios = require("axios");
const router = express.Router();
const { verifyToken, isAdminOrUser } = require('../shared/middleware/authMiddleware');


const TRANSACTION_SERVICE_URL = "http://localhost:3003/transactions";

router.post("/transfer",[verifyToken,isAdminOrUser], async (req, res) => {
  console.log("Request received at API Gateway:", req.body); // Debug log

  try {
    const response = await axios.post(
      `${TRANSACTION_SERVICE_URL}/transfer`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message); // Debug error
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

router.get("/:accountId",[verifyToken,isAdminOrUser], async (req, res) => {
  try {
    const { accountId } = req.params;
    const response = await axios.get(`${TRANSACTION_SERVICE_URL}/${accountId}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.get("/getTransactionsSentMoney/:userId",[verifyToken,isAdminOrUser], async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.get(
      `${TRANSACTION_SERVICE_URL}/getTransactionsSentMoney/${userId}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.get("/getTransactionsReceivedMoney/:userId",[verifyToken,isAdminOrUser], async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.get(
      `${TRANSACTION_SERVICE_URL}/getTransactionsReceivedMoney/${userId}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});

module.exports = router;
