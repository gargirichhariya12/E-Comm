const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// POST /api/newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already subscribed!' });

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({ message: 'Successfully subscribed!', subscriber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
