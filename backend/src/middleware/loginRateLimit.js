const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function loginRateLimit(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (current.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((current.resetAt - now) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      success: false,
      error: { message: 'Terlalu banyak percobaan login. Silakan coba lagi nanti.' },
    });
  }

  current.count += 1;
  next();
}

function clearLoginAttempts(req) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  attempts.delete(key);
}

module.exports = { loginRateLimit, clearLoginAttempts };
