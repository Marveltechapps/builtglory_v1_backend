const express = require('express');
const router = express.Router();
const savedPropertyController = require('../controllers/savedPropertyController');
const verifyToken = require('../middleware/auth');

// 🔍 Get saved property IDs
router.get('/', verifyToken, savedPropertyController.getSavedProperties);

// ➕ Save a property ID
router.post('/add', verifyToken, savedPropertyController.saveProperty);

// ❌ Remove a property ID
router.post('/remove', verifyToken, savedPropertyController.removeSavedProperty);

module.exports = router;
