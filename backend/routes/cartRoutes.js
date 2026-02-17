// =============================================
//  CART ROUTES
//  Add, Remove, Update, Get Cart
// =============================================

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

// =============================================
//  GET /api/cart
//  Get user's cart
// =============================================
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  POST /api/cart/add
//  Add product to cart
// =============================================
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    const existingItem = user.cart.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      user.cart.push({ product: productId, qty });
    }

    await user.save();

    res.json({ success: true, message: 'Added to cart!', cartCount: user.cart.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  PUT /api/cart/update
//  Update cart item quantity
// =============================================
router.put('/update', protect, async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(i => i.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not in cart' });
    }

    if (qty <= 0) {
      user.cart = user.cart.filter(i => i.product.toString() !== productId);
    } else {
      item.qty = qty;
    }

    await user.save();
    res.json({ success: true, message: 'Cart updated!', cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  DELETE /api/cart/remove/:productId
//  Remove item from cart
// =============================================
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(i => i.product.toString() !== req.params.productId);
    await user.save();
    res.json({ success: true, message: 'Item removed from cart!', cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  DELETE /api/cart/clear
//  Clear entire cart
// =============================================
router.delete('/clear', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { cart: [] });
    res.json({ success: true, message: 'Cart cleared!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
