const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const verifyToken = require('../middleware/auth');

// ➕ Submit enquiry and update history
router.post('/', verifyToken, enquiryController.submitEnquiry);

module.exports = router;
