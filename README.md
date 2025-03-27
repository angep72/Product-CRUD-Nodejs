# Simple E-Commerce Backend (Node.js + MongoDB)

## Overview
A lightweight e-commerce backend API built with Node.js, Express, and MongoDB. This project provides basic product management and shopping cart functionality with authentication.

## Features
- **Product Management**:
  - List all products
  - Get product details by ID
  - Add new products
- **Shopping Cart**:
  - View cart contents
  - Add products to cart
  - Automatic stock management

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose ODM)
- **Middleware**: body-parser

## Prerequisites
- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-commerce-backend.git
   cd e-commerce-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB:
   - For local MongoDB: Ensure MongoDB service is running
   - For MongoDB Atlas: Update connection string in `src/config/db.js`

4. Start the server:
   ```bash
   node src/server.js
   ```

## API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create new product
  ```json
  {
    "name": "Product Name",
    "price": 100,
    "quantity": 10
  }
  ```

### Cart
- `GET /cart` - Get cart contents
- `POST /cart` - Add item to cart
  ```json
  {
    "productId": "64f1b1b1b1b1b1b1b1b1b1b1",
    "quantity": 2
  }
  ```

## Project Structure
```
src/
├── config/        # Database configuration
├── controllers/   # Route controllers
├── models/        # MongoDB models
├── routes/        # API route definitions
└── server.js      # Application entry point
```

## Sample Requests

### Create Product
```bash
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name":"Smartphone","price":599,"quantity":20}'
```

### Add to Cart
```bash
curl -X POST http://localhost:3000/cart \
-H "Content-Type: application/json" \
-d '{"productId":"64f1b1b1b1b1b1b1b1b1b1b1","quantity":1}'
```

## Future Improvements
- Add user authentication
- Implement order processing
- Add product categories
- Include product images
- Add search functionality

## License
MIT License - Feel free to use and modify for your projects.