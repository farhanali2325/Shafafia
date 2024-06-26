const Person = require('../models/person');
require('dotenv').config();
const axios = require('axios');

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
  const { id } = req.body.member;
  const { companyID } = req.body.member.contract;
  const { endNo } = req.body;

  try {
    if (req.body) {
      // Call the function to send the data to the external API
      const fileInfo = await postJsonToApi(req.body, id);
      let person = await getPersonByCardNoEndNoPolNo(id, endNo, companyID);
      // Check if person already exists
      if (person) {
        // If person exists, update the existing record
        const updatedPerson = await Person.findByIdAndUpdate(req.body._id, req.body, { new: true });
        updatedPerson.fileInfo = fileInfo;
        // Return the updated person along with fileInfo
        return res.status(200).json({ person: updatedPerson, fileInfo });
      } else {
        // If person does not exist, create a new one
        person = new Person(req.body);
        await person.save();
        person.fileInfo = fileInfo;
        // Return the new person along with fileInfo
        return res.status(200).json({ person, fileInfo });
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// PATCH update a person by ID
const updatePersonById = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    return res.json(updatedPerson);
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
    const person = await Person.findOne(
      { 'member.id': cardNo, 'endNo': endNo, 'member.contract.companyID': polNo }
    );
    return person;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw new Error('Error fetching person');
  }
};


const postJsonToApi = async (person) => {
  try {
    const response = await axios.post(`${process.env.SERVER_URL_DOTNET}api/PersonRegisters`, person);
    return response.data;
  } catch (error) {
    console.error('Error posting data to API:', error);
    if (error.response) {
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    }
  }
};

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
  getPersonByCardNoEndNoPolNo,
  postJsonToApi,
};
