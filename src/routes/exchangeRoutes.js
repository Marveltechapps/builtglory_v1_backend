const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');
const assignExchangeRefs = require('../middleware/assignExchangeRefs');
const verifyToken = require('../middleware/auth');

// Create exchange with middleware-assigned references
router.post('/', verifyToken, assignExchangeRefs, exchangeController.createExchange);

// 📥 Read All
router.get('/', verifyToken, exchangeController.getAllExchanges);

// ✏️ Update
router.put('/:id', verifyToken, exchangeController.updateExchange);

// Get exchange by ID
router.get('/:id', verifyToken, exchangeController.getExchangeById);

// Delete exchange
router.delete('/:id', verifyToken, exchangeController.deleteExchange);

module.exports = router;
