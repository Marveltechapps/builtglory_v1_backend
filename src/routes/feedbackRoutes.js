const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const verifyToken = require('../middleware/auth');

// ➕ Submit feedback
router.post('/', verifyToken, feedbackController.submitFeedback);

// 🔍 Get all feedback by user
router.get('/', verifyToken, feedbackController.getUserFeedback);

// 📝 Update feedback
router.put('/:id', verifyToken, feedbackController.updateFeedback);

// ❌ Delete feedback
router.delete('/:id', verifyToken, feedbackController.deleteFeedback);

module.exports = router;
