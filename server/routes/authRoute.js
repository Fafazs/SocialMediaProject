const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

router.post('/register', authController.userRegister);

router.post('/login', authController.authenticateLogin);

router.get('/cookieAuth',authenticate, authController.authenticateCookie);

module.exports = router;