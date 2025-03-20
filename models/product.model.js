const mongoose = require('mongoose');

// Custom validator function to ensure strings are not empty after trimming
function isNotEmpty(value) {
  return value && value.trim() !== '';
}

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      validate: [isNotEmpty, 'Name cannot be empty']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      validate: [isNotEmpty, 'Description cannot be empty']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: 'Price must be a positive number or zero',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      validate: [isNotEmpty, 'Category cannot be empty']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(v); // Regex for validating URL
        },
        message: 'Invalid image URL',
      }
    }
  },
  { timestamps: true }
);

ProductSchema.pre('save', function (next) {
  // Example check: Ensure image URL is not empty
  if (!this.image || this.image.trim() === '') {
    return next(new Error('Image URL cannot be empty'));
  }
  
  next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
