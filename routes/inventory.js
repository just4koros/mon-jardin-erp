const express = require('express');
const router = express.Router();
const { getInventory, addProduct, modifyStock } = require('../controllers/inventoryController');

router.get('/', getInventory);
router.post('/', addProduct);
router.patch('/:product_id', modifyStock);

module.exports = router;
