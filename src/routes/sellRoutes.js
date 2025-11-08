const express = require('express');
const router = express.Router();
const sellController = require('../controllers/sellController');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/s3Upload'); // multer config with memoryStorage

router.post('/', verifyToken, upload.array('images'), sellController.createSell);

// Public routes
router.get('/', sellController.getAllSells);
router.get('/:id', sellController.getSellById);

// 🔐 Optional: protect update/delete if needed
router.put('/:id', verifyToken, sellController.updateSell);
router.delete('/:id', verifyToken, sellController.deleteSell);

module.exports = router;
