const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  stockCount: { type: Number, required: true },
  lowStockThreshold: { type: Number, default: 10 },
});

module.exports = mongoose.model('Inventory', inventorySchema);