const jwt = require('jsonwebtoken');
const env = require('../config/env');

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.auth = {
      userId: payload.sub,
      email: payload.email,
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = {
  requireAuth,
};
