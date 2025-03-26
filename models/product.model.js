const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  stock_quantity: { type: Number, required: true },
  image: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);