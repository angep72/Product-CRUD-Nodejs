const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://angep32:eVE7wc6TBEFy0AMs@summativeapi.6s4pw.mongodb.net/").then(()=>{
    console.log('Connected to MongoDB');
}).catch(
    (err)=>console.error('Could not connect to MongoDB',err)
)

//yPabozushDlBEkTy
//eVE7wc6TBEFy0AMs

app.listen(3000,"localhost",()=>{
    console.log('Server is running on port 3000');
})

app.get('/',(req,res)=>{
    res.send('Hello World');
})