const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
