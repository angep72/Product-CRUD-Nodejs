const Product = require("../models/product.model");
const { isValidObjectId } = require('mongoose'); 
const Inventory = require('../models/inventory.model');

const Category = require("../models/category.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    .populate('category_id','name')
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;  // Assuming you're passing the product ID in the URL
    const product = await Product.findById(productId)
      .populate('category_id', 'name')  // Populate the category's name field
      .exec();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, stock_quantity,image } = req.body;

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
      stock_quantity,
      image
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

const getProductByCategory = async (req, res) => {
  try {
    const categoryName = req.query.category_name; // Get category name from query parameter

    // Find the category based on the category name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find products belonging to that category
    const products = await Product.find({ category_id: category._id });

    // Return the products as a response
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

const filterProductsByCategory = async(req, res) => {
  
  try {
    const { categoryName } = req.query;
    console.log(categoryName);

    // If no category name provided, return error
    if (!categoryName) {
      return res.status(400).json({ 
        message: 'Category name is required' 
      });
    }

    // Find the category first using the name
    const category = await Category.findOne({ 
      name: { $regex: new RegExp(categoryName, 'i') } 
    });

    // If no category found, return 404
    if (!category) {
      return res.status(404).json({ 
        message: `No category found with name: ${categoryName}` 
      });
    }

    // Find products that match the category_id
    const products = await Product.find({ 
      category_id: category._id 
    }).populate('category_id'); // Optional: populate category details

    // Handle case when no products are found
    if (products.length === 0) {
      return res.status(404).json({ 
        message: `No products found in category: ${categoryName}` 
      });
    }

    // Return filtered products
    res.status(200).json({
      category: category,
      count: products.length,
      products: products
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error filtering products', 
      error: error.message 
    });
  }
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  postProduct,
  upDateProduct,
  deleteProduct,
  getProductByCategory,
  filterProductsByCategory
};
