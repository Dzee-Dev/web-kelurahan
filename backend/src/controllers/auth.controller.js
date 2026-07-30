const { verifyPassword } = require('../services/adminAuth.service');
const { clearLoginAttempts } = require('../middleware/loginRateLimit');
const {
  COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} = require('../middleware/adminAuth');

async function login(req, res, next) {
  try {
    if (!process.env.ADMIN_PASSWORD_HASH || !process.env.SESSION_SECRET) {
      return res.status(503).json({
        success: false,
        error: { message: 'Autentikasi admin belum dikonfigurasi di server' },
      });
    }

    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!password || password.length > 128 || !(await verifyPassword(password))) {
      return res.status(401).json({
        success: false,
        error: { message: 'Password admin tidak valid' },
      });
    }

    clearLoginAttempts(req);
    res.cookie(COOKIE_NAME, createSessionToken(), sessionCookieOptions());
    res.json({ success: true, data: { role: 'admin' } });
  } catch (error) {
    next(error);
  }
}

function logout(_req, res) {
  const options = sessionCookieOptions();
  delete options.maxAge;
  res.clearCookie(COOKIE_NAME, options);
  res.json({ success: true });
}

function session(req, res) {
  res.json({ success: true, data: { authenticated: true, role: req.admin.role } });
}

module.exports = { login, logout, session };
