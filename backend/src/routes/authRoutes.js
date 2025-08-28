/**
 * @deprecated This file is deprecated and should not be used.
 * Please use auth.routes.js instead which uses ES module syntax.
 * This file is causing conflicts in the authentication system.
 */

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-otp', authController.resendVerificationOTP);

module.exports = router;
