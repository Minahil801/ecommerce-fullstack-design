// =============================================
//  ORDER ROUTES
//  Place order, get orders, update status
// =============================================

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// =============================================
//  POST /api/orders
//  Place a new order
// =============================================
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * 0.1;
    const totalPrice = subtotal + tax;

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      subtotal: subtotal.toFixed(2),
      shippingPrice: 0,
      tax: tax.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    });

    // Clear user cart after order placed
    await User.findByIdAndUpdate(req.user._id, { cart: [] });

    res.status(201).json({ success: true, message: 'Order placed!', order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  GET /api/orders/my
//  Get logged-in user's orders
// =============================================
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  GET /api/orders  (Admin only)
//  Get all orders
// =============================================
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =============================================
//  PUT /api/orders/:id/status  (Admin only)
//  Update order status
// =============================================
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: 'Order status updated!', order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
