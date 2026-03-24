require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const env = require('./config/env');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = env.PORT;

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: false,
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.json());

if (env.NODE_ENV !== 'test') {
  connectDB();
}

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from code-backend (Node + Express + MongoDB)' });
});

app.get('/health', (req, res) => {
  const readyStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.status(200).json({
    status: 'ok',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: readyStateMap[mongoose.connection.readyState] || 'unknown',
  });
});

// Example route group
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/predictions', require('./routes/predictions'));

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = (port, retriesLeft = 10) => {
  const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && retriesLeft > 0) {
      console.warn(`Port ${port} is in use. Retrying on port ${port + 1}...`);
      startServer(port + 1, retriesLeft - 1);
      return;
    }

    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
};

if (require.main === module) {
  startServer(PORT);
}

module.exports = {
  app,
  startServer,
};
