const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

// GET /api/users
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user record.' });
  }
});

// POST /api/users
router.post('/', (req, res) => {
  res.status(405).json({ message: 'Use /api/auth/register to create users.' });
});

module.exports = router;
