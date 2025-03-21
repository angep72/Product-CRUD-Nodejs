const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require ("./routes/product.route")
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser")

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
app.get('/' , (req,res)=>{res.render('home')});
app.get("/api/products/:id", productRoute);
app.post("/api/products", productRoute);
app.put("/api/products/:id", productRoute);
app.delete("/api/products/:id", productRoute);

//Authorization and authentication routes
app.use(authRoutes);


app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
