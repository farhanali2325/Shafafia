const express = require('express');
const router = express.Router();
const endorsmentController = require('../controllers/endorsmentController');

router.post('/fetch-endorsments', endorsmentController.getAllEndorsments);

router.post('/save-endorsments', endorsmentController.createEndorsments);


module.exports = router;
