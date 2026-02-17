// =============================================
//  PRODUCT ROUTES
//  GET, POST, PUT, DELETE for products
// =============================================

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// =============================================
//  GET /api/products
//  Get all products (with search & filter)
// =============================================
router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

    // Build filter object
    let filter = {};

    // Search by name or description
    if (search) {
      filter.$or = [
        { name:        { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category:    { $regex: search, $options: 'i' } },
        { brand:       { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) filter.category = category;

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price-low')  sortOption = { price: 1 };
    if (sort === 'price-high') sortOption = { price: -1 };
    if (sort === 'rating')     sortOption = { rating: -1 };

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      products,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  GET /api/products/featured
//  Get featured products for homepage
// =============================================
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(6);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  GET /api/products/:id
//  Get single product by ID
// =============================================
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  POST /api/products
//  Create new product (Admin only)
// =============================================
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Product created!', product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// =============================================
//  PUT /api/products/:id
//  Update product (Admin only)
// =============================================
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product updated!', product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// =============================================
//  DELETE /api/products/:id
//  Delete product (Admin only)
// =============================================
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
