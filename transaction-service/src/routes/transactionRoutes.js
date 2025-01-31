const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/transfer', transactionController.transfer);
router.get('/getTransactionsSentMoney/:userId', transactionController.getTransactionsSentMoney);
router.get('/getTransactionsReceivedMoney/:userId', transactionController.getTransactionsReceivedMoney);

module.exports = router;
