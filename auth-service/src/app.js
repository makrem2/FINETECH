const express = require('express');
const authRoutes = require('./routes/authRoutes');
const TokenBlackList = require('../src/models/tokenBlacklistModel');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);


app.listen(3001, () => {
    console.log('Auth Service running on port 3001');
});
