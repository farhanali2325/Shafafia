// controllers/personController.js
const fs = require('fs');
const path = require('path');
const Person = require('../models/person');
const { convertJsonToXml } = require('../helper/xmlHelper');
require('dotenv').config();

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
    if(req.body){
      const per = res.body;
      const createXML = await convertPerson(per)
      const projectRoot = path.resolve(__dirname, '../'); // Assumes this script is located in a subdirectory
      const savePath = path.join(projectRoot, 'xmlFiles');
      await saveXmlToFile(id, createXML, savePath);
      // const postXmlDataToApi = await postXmlToApi(xmlData, fileName);
      await postJsonToApi(per, id)
      let person = await getPersonByCardNoEndNoPolNo(id, endNo, companyID);
      if (person) {
        // If person exists, update the existing record
        const updatedPerson = await Person.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.status(200).json(updatedPerson);
      } else {
        // If person does not exist, create a new one
        person = new Person(req.body);
        await person.save();
        res.status(201).json(person);
      }
    }

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
    const person = await Person.findOne(
      { 'member.id': cardNo, 'endNo': endNo, 'member.contract.companyID': polNo },
      { __v: 0, _id: 0 }
    );
    return person;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw new Error('Error fetching person');
  }
};

const convertPerson = (per, res) => {
  const person = per;
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
    return xml;
  } catch (error) {
    console.error('Error converting JSON to XML:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const saveXmlToFile = (fName, xmlData, filePath) => {
  try {
    const now = new Date();
    const fileName = `${fName}.xml`; // Example file name format: person_data_2024-06-24T12-30-00Z.xml
    const fullPath = path.join(filePath, fileName); // Construct full path with directory and file name

    // Write XML data to file
    fs.writeFileSync(fullPath, xmlData);

    console.log(`XML data saved to ${fullPath}`);
  } catch (error) {
    console.error('Error saving XML data to file:', error);
  }
};

// Function to post XML data to an API
// const postXmlToApi = async (xmlData, fileName) => {
//   try {
//     const response = await axios.post(process.env.SERVER_URL_DOTNET, {
//       xmlData: xmlData,
//       fileName: fileName
//     });
//     console.log('API response:', response.data);
//   } catch (error) {
//     console.error('Error posting XML data to API:', error);
//   }
// };

const postJsonToApi = async (jsonData, memberId) => {
  try {
    console.log("jsonData: ", jsonData);
    console.log("memberId: ", memberId);
    const response = await axios.post(process.env.SERVER_URL_DOTNET, {
      jsonData: jsonData,
      fileName: memberId
    });
    console.log('API response:', response.data);
  } catch (error) {
    console.error('Error posting XML data to API:', error);
  }
};


module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
  getPersonByCardNoEndNoPolNo,
  convertPerson,
};
