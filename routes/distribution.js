const express = require('express');
const router = express.Router();
const { createDistribution, changeStatus, getDistributions } = require('../controllers/distributionController');

router.get('/', getDistributions);
router.post('/', createDistribution);
router.patch('/:distribution_id', changeStatus);

module.exports = router;
