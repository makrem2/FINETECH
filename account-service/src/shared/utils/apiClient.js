const axios = require('axios');

const apiClient = axios.create({
    timeout: 5000, // Timeout after 5 seconds
});

// Add common headers or interceptors here if needed
module.exports = apiClient;
