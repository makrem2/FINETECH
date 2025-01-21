const express = require('express');
const accountRoutes = require('./routes/accountRoutes');

const app = express();

app.use(express.json());
app.use('/accounts', accountRoutes);

app.listen(3002, () => {
    console.log('Account Service running on port 3002');
});
