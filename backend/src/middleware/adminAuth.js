const crypto = require('crypto');

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function sign(value) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET minimal 32 karakter belum dikonfigurasi');
  }
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function createSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = base64UrlEncode(JSON.stringify({
    sub: 'admin',
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  }));
  return `${payload}.${sign(payload)}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return false;

  let expected;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }

  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.sub === 'admin' && Number.isFinite(data.exp) && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function parseCookies(header = '') {
  return header.split(';').reduce((cookies, item) => {
    const separator = item.indexOf('=');
    if (separator === -1) return cookies;
    const key = item.slice(0, separator).trim();
    const value = item.slice(separator + 1).trim();
    if (key) cookies[key] = decodeURIComponent(value);
    return cookies;
  }, {});
}

function requireAdmin(req, res, next) {
  const token = parseCookies(req.headers.cookie)[COOKIE_NAME];
  if (!verifySessionToken(token)) {
    return res.status(401).json({
      success: false,
      error: { message: 'Sesi admin tidak valid atau sudah berakhir' },
    });
  }
  req.admin = { role: 'admin' };
  next();
}

function sessionCookieOptions() {
  const secure = process.env.COOKIE_SECURE
    ? process.env.COOKIE_SECURE === 'true'
    : process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS * 1000,
  };
}

module.exports = {
  COOKIE_NAME,
  createSessionToken,
  verifySessionToken,
  requireAdmin,
  sessionCookieOptions,
};
