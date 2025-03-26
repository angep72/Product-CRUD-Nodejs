const Product = require("../models/product.model");
const { isValidObjectId } = require('mongoose'); 
const Inventory = require('../models/inventory.model');

const Category = require("../models/category.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, stock_quantity } = req.body;

    // Check if category_id is a valid ObjectId
    if (!isValidObjectId(category_id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Check if category exists
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category_id,
      stock_quantity
    });
    const newInventory = new Inventory({
      product: newProduct._id,  // Reference to the newly created product
      stockCount: stock_quantity  // Default lowStockThreshold if not provided
    });
    // Save the product to the database
    await newProduct.save();
    await newInventory.save();

    // Respond with the created product
    res.status(201).json({
      product: newProduct,
      inventory: newInventory
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
  }

const upDateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) return res.status(404).json({ message: "Product not found" });
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const filtered_Products = async(req, res)=>{
  try {
    // Get query parameters from the URL
    const { category_id, min_price, max_price, stock_available } = req.query;

    let filter = {};

    if (category_id) {
      filter.category_id = category_id; // Filter by category
    }

    if (min_price || max_price) {
      filter.price = {};
    }
      if (min_price) {
        filter.price.$gte = parseFloat(min_price); 
      }
      if (max_price) {
        filter.price.$lte = parseFloat(max_price); 
    }

    if (stock_available !== undefined) {
      filter.stock_quantity = { $gt: 0 }; 
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
module.exports = {
  getAllProducts,
  getSingleProduct,
  postProduct,
  upDateProduct,
  deleteProduct,
  filtered_Products
};
