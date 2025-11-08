const express = require('express');
const router = express.Router();
const generalInfoController = require('../controllers/generalInfoController');

router.post('/', generalInfoController.createInfo);
router.get('/', generalInfoController.fetchAllInfo);
router.put('/:id', generalInfoController.updateInfo);
router.delete('/:id', generalInfoController.deleteInfo);

module.exports = router;
