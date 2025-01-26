const express = require("express");
const axios = require("axios");
const authMiddleware = require('../shared/middleware/authMiddleware');
const router = express.Router();

const TRANSACTION_SERVICE_URL = "http://localhost:3003/transactions";

router.post('/transfer', authMiddleware, async (req, res) => {
  try {
      const response = await axios.post(`${TRANSACTION_SERVICE_URL}/transfer`, req.body, {
          headers: { Authorization: req.headers.authorization }, // Forward JWT token
      });
      res.status(response.status).json(response.data);
  } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
  }
});

router.get("/:accountId", authMiddleware, async (req, res) => {
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

module.exports = router;
