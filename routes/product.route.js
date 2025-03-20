const express  = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/',async(req,res )=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

router.get('/:id',async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) res.json(product);
      else res.status(404).json({ message: "Product not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

router.post('/:id',async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

router.put('/:id',async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) return res.status(404).json({ message: "Product not found" });
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

router.delete('/:id',async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

module.exports = router;