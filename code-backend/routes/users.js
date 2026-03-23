const express = require('express');
const router = express.Router();
const User = require('../models/User');

const validateUserPayload = (body = {}) => {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (name.length < 2 || name.length > 80) {
    return { valid: false, message: 'Name must be between 2 and 80 characters.' };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { valid: false, message: 'Please provide a valid email address.' };
  }

  return {
    valid: true,
    data: {
      name,
      email,
    },
  };
};

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(100);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const validation = validateUserPayload(req.body);
    if (!validation.valid) {
      return res.status(422).json({ message: validation.message });
    }

    const user = new User({
      name: validation.data.name,
      email: validation.data.email,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }

    res.status(400).json({ message: error.message || 'Failed to save user.' });
  }
});

module.exports = router;
