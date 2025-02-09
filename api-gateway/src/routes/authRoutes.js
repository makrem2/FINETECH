const express = require('express');
const axios = require('axios');
const { verifyToken, hasRole, isAdmin } = require('../shared/middleware/authMiddleware');
const router = express.Router();

const AUTH_SERVICE_URL = 'http://localhost:3001/auth';


router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.put("/verifyEmail", async (req, res) => {
  try {
    const response = await axios.put(
      `${AUTH_SERVICE_URL}/verifyEmail`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.post("/signout", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/signout`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.put("/unblockUser/:id",verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(
      `${AUTH_SERVICE_URL}/unblockUser/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});
router.put("/blockUser/:id",verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${AUTH_SERVICE_URL}/blockUser/${id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "An error occurred" });
  }
});

module.exports = router;
