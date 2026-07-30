const crypto = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password) {
  if (typeof password !== 'string' || password.length < 10) {
    throw new Error('Password admin minimal 10 karakter');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(password, salt, 64);
  return `scrypt:${salt}:${derivedKey.toString('hex')}`;
}

async function verifyPassword(password, storedHash = process.env.ADMIN_PASSWORD_HASH) {
  if (!storedHash || typeof password !== 'string') return false;
  const [algorithm, salt, expectedHex, extra] = storedHash.split(':');
  if (algorithm !== 'scrypt' || !salt || !expectedHex || extra) return false;

  let expected;
  try {
    expected = Buffer.from(expectedHex, 'hex');
  } catch {
    return false;
  }
  if (expected.length !== 64) return false;

  const actual = await scryptAsync(password, salt, expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

module.exports = { hashPassword, verifyPassword };
