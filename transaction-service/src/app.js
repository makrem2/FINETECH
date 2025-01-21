const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(express.json());
app.use('/transactions', transactionRoutes);

app.listen(3003, () => {
    console.log('Transaction Service running on port 3003');
});
