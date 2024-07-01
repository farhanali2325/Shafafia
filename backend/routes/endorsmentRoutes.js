const express = require('express');
const router = express.Router();
const endorsmentController = require('../controllers/endorsmentController');

router.post('/fetch-endorsments', endorsmentController.getAllEndorsments);

router.post('/save-endorsments', endorsmentController.createEndorsments);

router.patch('/update-endorsment-status/:id', endorsmentController.updateEndorsmentStatusById);


module.exports = router;
