const express = require('express');
const router = express.Router();
const userController = require('../controllers/profileController');
const verifyToken = require('../middleware/auth');

// 🔍 Get user by mobile number
router.get('/', verifyToken, userController.getUserByMobile);

// 🔄 Update user profile
router.put('/', verifyToken, userController.updateUser);

// ❌ Delete user by mobile number
router.delete('/', verifyToken, userController.deleteUser);

module.exports = router;
