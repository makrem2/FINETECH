const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Transfer route
router.post('/transfer', transactionController.transfer);

module.exports = router;
