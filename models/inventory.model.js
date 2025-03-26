const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true,
    unique: true // Ensure one inventory entry per product
  },
  stockCount: { type: Number, required: true, default: 0 },
  lowStockThreshold: { type: Number, default: 10 }, // Alert when stock < 10
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);