const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const verifyToken = require('../middleware/auth');

// 🔍 Get full history
router.get('/', verifyToken, historyController.getHistory);

// ➕ Add to buyList
router.post('/buy', verifyToken, historyController.addToBuyList);

// ➕ Add to exchangeList
router.post('/exchange', verifyToken, historyController.addToExchangeList);

// ❌ Remove from buyList
router.post('/buy/remove', verifyToken, historyController.removeFromBuyList);

// ❌ Remove from exchangeList
router.post('/exchange/remove', verifyToken, historyController.removeFromExchangeList);

module.exports = router;
