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

router.post('/download-csv', (req, res) => {
  console.log("req.body: ", req.body);
  const filePath = req.body;

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
          console.error('File does not exist', err);
          return res.status(404).send({
              message: "File not found.",
          });
      }

      // Send the file for download
      res.download(filePath, 'ErrorsReport_NEW.csv', (err) => {
          if (err) {
              console.error('Error downloading the file', err);
              return res.status(500).send({
                  message: "Could not download the file. " + err,
              });
          }
      });
  });
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
