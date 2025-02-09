const express = require('express');
const axios = require('axios');
const router = express.Router();

const ACCOUNT_SERVICE_URL = 'http://localhost:3002/accounts';

// Route to create a new account
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${ACCOUNT_SERVICE_URL}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'An error occurred' });
    }
});

// Route to get accounts for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.get(`${ACCOUNT_SERVICE_URL}/${userId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'An error occurred' });
    }
});

module.exports = router;
