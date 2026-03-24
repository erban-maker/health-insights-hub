const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');

const router = express.Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeProfile = (userDoc) => ({
  id: String(userDoc._id),
  name: userDoc.name,
  email: userDoc.email,
});

router.post('/register', async (req, res) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (name.length < 2 || name.length > 80) {
      return res.status(422).json({ message: 'Name must be between 2 and 80 characters.' });
    }

    if (!emailPattern.test(email)) {
      return res.status(422).json({ message: 'Please provide a valid email address.' });
    }

    if (password.length < 6) {
      return res.status(422).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const profile = sanitizeProfile(user);
    const token = jwt.sign({ sub: profile.id, email: profile.email }, env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(201).json({ user: profile, token });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!emailPattern.test(email) || password.length === 0) {
      return res.status(422).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const profile = sanitizeProfile(user);
    const token = jwt.sign({ sub: profile.id, email: profile.email }, env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({ user: profile, token });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed.' });
  }
});

module.exports = router;
