const express = require('express');
const router = express.Router();
const upload = require('../middleware/s3Upload');
const userImageController = require('../controllers/userImageController');
const verifyToken = require('../middleware/auth');

router.post('/upload-profile-image', verifyToken, upload.single('profileImage'), userImageController.uploadProfileImage);

module.exports = router;
