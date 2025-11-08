const express = require('express');
const router = express.Router();
const controller = require('../controllers/onboardingScreenController');

router.post('/screens', controller.createScreen);
router.get('/screens', controller.getAllScreens);
router.get('/screens/:id', controller.getScreenById);
router.put('/screens/:id', controller.updateScreenById);
router.delete('/screens/:id', controller.deleteScreenById);

module.exports = router;
