const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');
const { adminMiddleware } = require('../middleware/adminMiddleware');

// POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { items, subtotal, discount, deliveryFee, totalAmount, shippingAddress } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      subtotal,
      discount,
      deliveryFee,
      totalAmount,
      shippingAddress,
    });
    // Clear user's cart after order
    const sessionId = req.headers['x-session-id'] || 'default-session';
    await Cart.findOneAndUpdate({ sessionId }, { items: [] });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders (user's orders)
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/all (admin)
router.get('/all', protect, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:id/status (admin)
router.put('/:id/status', protect, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
