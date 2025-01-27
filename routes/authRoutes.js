const express = require('express');
const { register, loginWithOTP, verifyOtp } = require('../controllers/AuthController');
const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for login with OTP
router.post('/login', loginWithOTP);

// Route to verify OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;
