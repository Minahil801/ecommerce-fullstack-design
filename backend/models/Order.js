// =============================================
//  ORDER MODEL
// =============================================

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name:    { type: String, required: true },
      image:   { type: String },
      price:   { type: Number, required: true },
      qty:     { type: Number, required: true, default: 1 },
    }
  ],
  shippingAddress: {
    fullName: String,
    address:  String,
    city:     String,
    country:  String,
    zipCode:  String,
  },
  paymentMethod: {
    type: String,
    default: 'Credit Card',
  },
  subtotal:      { type: Number, required: true },
  shippingPrice: { type: Number, default: 0 },
  tax:           { type: Number, default: 0 },
  totalPrice:    { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  isPaid:      { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  paidAt:      { type: Date },
  deliveredAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
