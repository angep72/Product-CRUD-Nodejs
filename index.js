const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require ("./routes/product.route")


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get('/' ,productRoute)
app.get("/api/products/:id", productRoute);
app.post("/api/products", productRoute);
app.put("/api/products/:id", productRoute);
app.delete("/api/products/:id", productRoute);


app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
