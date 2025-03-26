

const Inventory = require('../models/inventory.model');
const Product = require('../models/product.model');

// Update inventory when product stock changes
exports.updateInventory = async (req, res) => {
  try {
    const { productId, stockCount } = req.body;

    // 1. Find the inventory entry for the product
    let inventory = await Inventory.findOne({ product: productId });

    // 2. If no inventory exists, create one (safety check)
    if (!inventory) {
      inventory = new Inventory({ product: productId, stockCount });
    } else {
      inventory.stockCount = stockCount;
    }

    await inventory.save();
    res.status(200).json(inventory);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get inventory for a product (including product details)
exports.getInventoryByProductId = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ product: req.params.productId })
      .populate('Products'); // Include full product details

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }
    res.status(200).json(inventory);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
      stockCount: { $lt: '$lowStockThreshold' },
    }).populate('product');
    res.status(200).json(lowStockItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};