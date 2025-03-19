const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model');






mongoose.connect("mongodb+srv://angep32:eVE7wc6TBEFy0AMs@summativeapi.6s4pw.mongodb.net/").then(()=>{
    console.log('Connected to MongoDB');
}).catch(
    (err)=>console.error('Could not connect to MongoDB',err)
)

app.post('/products',async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);

        
    } catch (error) {
        res.status(500).json({message:error.message});
    }

})











app.listen(3000,"localhost",()=>{
    console.log('Server is running on port 3000');
})

