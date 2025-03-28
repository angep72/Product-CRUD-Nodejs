const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/auth.middleware");
const categoryRoutes = require('./routes/category.route');
const inventoryRoutes = require('./routes/inventory');
const swaggerUi = require("swagger-ui-express");


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//swagger configurations

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Smoothie Shop API",
//       version: "1.0.0",
//       description: "A simple API for managing smoothie shop products",
//       contact: {
//         name: "John Doe",
//         email: "john.doe@example.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
    
//         description: "Development server",
    
//         },
//     ],
//   },
//   apis: ["./routes/*.route.js"],
// };

const swaggerDocumentation = require("./swagger-output.json")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// Set EJS as the view engine and serve static files from the 'public' folder
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Database Connection using environment variable for Mongo URI
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
  });

// Routes
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoutes);
app.use("/api/inventory", inventoryRoutes);

// Authenticated routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

// Auth Routes
app.use(authRoutes);







// Start the server
app.listen(process.env.PORT || 3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
