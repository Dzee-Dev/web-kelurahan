const express = require('express');
const authController = require('../controllers/auth.controller');
const { requireAdmin } = require('../middleware/adminAuth');
const { loginRateLimit } = require('../middleware/loginRateLimit');

const router = express.Router();

router.post('/login', loginRateLimit, authController.login);
router.post('/logout', requireAdmin, authController.logout);
router.get('/session', requireAdmin, authController.session);

module.exports = router;
