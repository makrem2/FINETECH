const express = require('express');
const axios = require('axios');
const router = express.Router();

// Base URL for Auth Service
const AUTH_SERVICE_URL = 'http://localhost:3001/auth';

// Route to register a new user
router.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/register`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'An error occurred' });
    }
});

// Route to login a user
router.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'An error occurred' });
    }
});

module.exports = router;
