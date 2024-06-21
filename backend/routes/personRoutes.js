// routes/personRoutes.js

const express = require('express');
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

router.post('/person', async (req, res) => {
    const { cardNo, endNo, polNo } = req.body;
  
    try {
      console.log("Request body:", req.body);
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
