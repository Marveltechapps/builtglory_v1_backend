const express = require('express');
const router = express.Router();
const exploreController = require('../controllers/exploreController');

router.get('/', exploreController.fetchAndFilterProperties);

module.exports = router;
