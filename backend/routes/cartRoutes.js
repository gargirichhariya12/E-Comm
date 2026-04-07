const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getSessionId = (req) => {
  return req.headers['x-session-id'] || 'default-session';
};

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    let cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart) cart = { sessionId, items: [] };
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cart
router.post('/', async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { productId, quantity = 1, size = 'M', color = 'Black' } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ sessionId });
    if (!cart) cart = new Cart({ sessionId, items: [] });

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        name: product.name,
        image: product.images[0] || '',
        price: product.discountedPrice || product.price,
        size,
        color,
        quantity,
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/cart/:id
router.put('/:id', async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await Cart.findOne({ sessionId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.id);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
