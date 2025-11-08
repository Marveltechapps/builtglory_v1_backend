const express = require('express');
const router = express.Router();
const {
    sendOTP,
    verifyOTP,
    resendOTP,
    getUserByPhone,
    deleteUserByPhone
} = require('../controllers/OTPController');

// Request to send OTP to a mobile number
router.post('/send-otp', sendOTP);

// Verify OTP and get JWT token
router.post('/verify-otp', verifyOTP);

// Resend OTP to mobile number
router.post('/resend-otp', resendOTP);

// Get user details by mobile number
router.get('/:mobileNumber', getUserByPhone);

// Delete user by mobile number
router.delete('/:mobileNumber', deleteUserByPhone);

module.exports = router;
