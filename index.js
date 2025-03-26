const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require ("./routes/product.route")
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser")
const {requireAuth, checkUser} = require("./middleware/auth.middleware")
const categoryRoutes = require('./routes/category.route');
const inventoryRoutes = require('./routes/inventory');
const Products = require('./models/product.model')
//Middlewares



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static('public'));


//Database Connection
mongoose
  .connect(
    "mongodb+srv://angep32:eVE7wc6TBEFy0AMs@summativeapi.6s4pw.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));


//Routes
app.use("/api/products",productRoute)

// app.get("/api/products/:id", productRoute);
// app.post("/api/products", productRoute);
// app.put("/api/products/:id", productRoute);
// app.delete("/api/products/:id", productRoute);


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

//Routes
app.use(authRoutes);
app.use("/api/products",productRoute)
app.use("/api/category",categoryRoutes);
app.use("/api/inventory",inventoryRoutes);

app.get('/api/products',async(req, res)=>{
  try {
    // Get query parameters from the URL
    const { category_id, min_price, max_price, stock_available } = req.query;

    // Build the filter object dynamically based on the query params
    let filter = {};

    if (category_id) {
      filter.category_id = category_id; // Filter by category
    }

    if (min_price || max_price) {
      filter.price = {};
      if (min_price) {
        filter.price.$gte = parseFloat(min_price); // Greater than or equal to min_price
      }
      if (max_price) {
        filter.price.$lte = parseFloat(max_price); // Less than or equal to max_price
      }
    }

    if (stock_available !== undefined) {
      filter.stock_quantity = { $gt: 0 }; // Only products with stock greater than 0
    }

    // Query the database for products based on the filter
    const products = await Products.find(filter);

    // Return the products
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})




app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
