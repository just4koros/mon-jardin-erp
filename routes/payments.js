const express = require('express');
const router = express.Router();
const { createPayment, getPayments } = require('../controllers/paymentsController');

router.get('/', getPayments);
router.post('/', createPayment);

module.exports = router;
