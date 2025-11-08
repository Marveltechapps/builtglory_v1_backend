const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middleware/auth');

// ➕ Create notification
router.post('/', verifyToken, notificationController.createNotification);

// 🔍 Get all notifications for user
router.get('/', verifyToken, notificationController.getUserNotifications);

// ✅ Mark notification as read
router.put('/:id/read', verifyToken, notificationController.markAsRead);

// ❌ Delete notification
router.delete('/:id', verifyToken, notificationController.deleteNotification);

module.exports = router;
