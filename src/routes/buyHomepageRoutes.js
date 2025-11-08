const express = require('express');
const router = express.Router();
const controller = require('../controllers/buyHomepageController');

// Get properties by type
router.get('/', controller.getPropertiesByType);

// Search properties using POST body
router.post('/search', controller.searchProperties);

module.exports = router;
