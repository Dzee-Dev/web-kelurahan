/**
 * Global error handling middleware
 */

class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
  }
}

/**
 * 404 Not Found handler
 */
function notFoundHandler(req, res, next) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} tidak ditemukan`, 404));
}

/**
 * Central error handler middleware
 */
function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  const response = {
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(err.details && { details: err.details }),
      ...(!isProduction && { stack: err.stack }),
    },
  };

  // Log error di server
  if (statusCode >= 500) {
    console.error('❌ Server Error:', err);
  }

  res.status(statusCode).json(response);
}

module.exports = { AppError, errorHandler, notFoundHandler };
