require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect MongoDB
connectDB();

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from code-backend (Node + Express + MongoDB)' });
});

// Example route group
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
