const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');

// Update inventory for a product
router.put('/', inventoryController.updateInventory);

// Get inventory for a product
router.get('/:productId', inventoryController.getInventoryByProductId);

// Get low stock items
router.get('/low-stock', inventoryController.getLowStockItems);


module.exports = router;