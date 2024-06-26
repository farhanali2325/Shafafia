const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const personController = require('../controllers/personController');

// GET all persons
router.get('/persons', personController.getAllPersons);

// GET one person by ID
router.get('/persons/:id', personController.getPersonById);

// POST create a new person
router.post('/persons', personController.createPerson);

// PATCH update a person by ID
router.patch('/persons/:id', personController.updatePersonById);

// DELETE a person by ID
router.delete('/persons/:id', personController.deletePersonById);

router.get('/download-csv', (req, res) => {
  const filePath = req.query.filePath; // Get filePath from query parameter

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set the appropriate headers
    const fileName = path.basename(filePath);
    res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-type', 'application/octet-stream'); // Set appropriate content type

    // Create a readable stream of the file
    const fileStream = fs.createReadStream(filePath);

    // Pipe the stream response to the client
    fileStream.pipe(res);
  } else {
    // If file doesn't exist, return 404 Not Found
    res.status(404).send('File not found');
  }
});

router.post('/person', async (req, res) => {
    const { cardNo, endNo, polNo } = req.body;
    try {
      const person = await personController.getPersonByCardNoEndNoPolNo(cardNo, endNo, polNo);
  
      if (!person) {
        return res.status(204).json({ message: 'Person not found' });
      }
      res.status(200).json(person);
    } catch (error) {
      console.error('Error fetching person:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  
  module.exports = router;
