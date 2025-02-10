const express = require("express");
const axios = require("axios");
const router = express.Router();
const { verifyToken, isAdmin, isAdminOrUser } = require('../shared/middleware/authMiddleware');

const ACCOUNT_SERVICE_URL = "http://localhost:3002/accounts";

router.post("/createAccount",[verifyToken,isAdminOrUser], async (req, res) => {
  try {
    const response = await axios.post(`${ACCOUNT_SERVICE_URL}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.patch("/updateAccountBalance/:id",[verifyToken,isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.patch(
      `${ACCOUNT_SERVICE_URL}/updateAccountBalance/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.get("/getAccountsByUser/:userId",[verifyToken,isAdminOrUser], async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.get(
      `${ACCOUNT_SERVICE_URL}/getAccountsByUser/${userId}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.get("/getAccountById/:id",[verifyToken,isAdminOrUser], async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${ACCOUNT_SERVICE_URL}/${id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.put("/activateAccount/:id",[verifyToken,isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(
      `${ACCOUNT_SERVICE_URL}/activateAccount/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.put("/suspendedAccount/:id",[verifyToken,isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(
      `${ACCOUNT_SERVICE_URL}/suspendedAccount/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.put("/closedAccount/:id",[verifyToken,isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(
      `${ACCOUNT_SERVICE_URL}/closedAccount/${id}`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
module.exports = router;
