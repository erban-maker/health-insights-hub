require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

const seedUsers = [
  { name: 'Demo User One', email: 'demo1@example.com' },
  { name: 'Demo User Two', email: 'demo2@example.com' },
  { name: 'Demo User Three', email: 'demo3@example.com' },
];

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany({ email: { $in: seedUsers.map((u) => u.email) } });
    await User.insertMany(seedUsers);
    console.log('Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
