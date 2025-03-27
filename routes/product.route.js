const express  = require('express');
const router = express.Router();
const {getAllProducts,getSingleProduct,postProduct,upDateProduct,deleteProduct, getProductByCategory, filterProductsByCategory, addToCart} = require('../controllers/product.controller');
router.get('/all',getAllProducts);
router.get('/:id',getSingleProduct);
router.post('/',postProduct);
router.put('/:id',upDateProduct)
router.delete('/:id',deleteProduct)
router.get('/:categoryId', getProductByCategory); 
router.get('/',filterProductsByCategory);
router.post('/add', addToCart)


module.exports = router;