// controllers/personController.js

const Person = require('../models/person');
const { convertJsonToXml } = require('../helper/xmlHelper');
// GET all persons
const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one person by ID
const getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new person
const createPerson = async (req, res) => {
  const person = new Person({
    unifiedNumber: req.body.unifiedNumber,
    firstNameEn: req.body.firstNameEn,
    middleNameEn: req.body.middleNameEn,
    // Add other fields as needed
    member: req.body.member, // Assuming member object is passed in request body
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH update a person by ID
const updatePersonById = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a person by ID
const deletePersonById = async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPersonByCardNoEndNoPolNo = async (cardNo, endNo, polNo) => {
    try {
      const person = await Person.findOne({ 'member.id': cardNo, 'endNo': endNo, 'member.contract.companyID': polNo });
      return person;
    } catch (error) {
      console.error('Error fetching person:', error);
      throw new Error('Error fetching person');
    }
  };

  const convertPersonToJson = (req, res) => {
    const person = req.body.person;
    const header = {
      SenderID: "A025",
      ReceiverID: "HAAD",
      TransactionDate: "23/06/2024 12:29",
      RecordCount: 1,
      DispositionFlag: process.env.NODE_ENV
  };
  
    if (!person || !header) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
  
    try {
      const xml = convertJsonToXml(person, header);
      res.set('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error('Error converting JSON to XML:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
  getPersonByCardNoEndNoPolNo,
  convertPersonToJson,
};
