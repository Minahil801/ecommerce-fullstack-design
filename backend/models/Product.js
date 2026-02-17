// =============================================
//  PRODUCT MODEL
//  Defines the shape of product data in MongoDB
// =============================================

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  oldPrice: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },

  // Category & Brand
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Gadgets', 'Clothing', 'Home', 'Sports', 'Jewelry', 'Kitchen', 'Garden'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
  },

  // Stock
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
  },

  // Ratings
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },

  // Featured flag
  isFeatured: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true }); // adds createdAt and updatedAt automatically

module.exports = mongoose.model('Product', productSchema);
