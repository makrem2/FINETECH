const express = require('express');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

// Start server
app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});