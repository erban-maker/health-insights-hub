const notFoundHandler = (req, res, next) => {
  res.status(404);
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  if (statusCode >= 500) {
    console.error('[server-error]', err);
  }

  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
