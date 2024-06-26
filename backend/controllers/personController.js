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


const validateData = (person, fileName) => {
  if (!person || typeof person !== 'object') {
    throw new Error('Invalid person');
  }
  if (!fileName || typeof fileName !== 'string') {
    throw new Error('Invalid fileName');
  }
};

const postJsonToApi = async (person) => {
  try {
    // Ensure the data structure is correct
    console.log("personData: ", person);

    console.log("Server URL: ", process.env.SERVER_URL_DOTNET); // Log the server URL

    const response = await axios.post(`${process.env.SERVER_URL_DOTNET}api/PersonRegisters`, person);

    console.log("postJsonToApi.response: ", response.data);
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


// const postJsonToApi = async (person, memberId) => {
//   try {
//     validateData(person, memberId);

//     console.log("person: ", person);
//     console.log("memberId: ", memberId);
//     console.log("Server URL: ", process.env.SERVER_URL_DOTNET); // Log the server URL
//     console.log("person: ", person)
//     const newpers = `{"member": {
//         "contract": {
//           "packageName": "57245",
//           "startDate": "08/06/2024",
//           "renewalDate": "08/06/2024",
//           "expiryDate": "09/04/2025",
//           "grossPremium": "2642.5",
//           "policyHolder": "6",
//           "companyID": "P/02/2024/000101",
//           "vat": "132.12",
//           "collectedPremium": "2774.62",
//           "status": "New",
//           "vatpercent": "2",
//           "policyNumber": "farhan1234"
//         },
//         "id": "102-103-0007354901-01",
//         "relation": "Spouse",
//         "relationTo": "102-103-0006455901-01"
//       },
//       "_id": "6679171d5ef7bfd20a192b85",
//       "unifiedNumber": "80788178",
//       "firstNameEn": "SADAF IQBAL ALI YOUSAF",
//       "middleNameEn": "IQBAL",
//       "lastNameEn": "ALI YOUSAF",
//       "firstNameAr": "صدف اقبال على يوسف",
//       "middleNameAr": "اقبال",
//       "lastNameAr": "يوسف على",
//       "contactNumber": "NA",
//       "birthDate": "04/12/1988",
//       "gender": "0",
//       "nationality": "Pakistani",
//       "nationalityCode": "200",
//       "city": "ABU DHABI",
//       "passportNumber": "YN1333481",
//       "emiratesIDNumber": "111-1111-1111111-1",
//       "sponsorNumber": "37134332",
//       "sponsorNameEn": "ALI YOUSAF MUHAMMAD YOUSAF",
//       "sponsorNameAr": "على يوسف محمد يوسف",
//       "endNo": "31",
//       "__v": "0",
//       "visaNumber": "50far50",
//       "sponsorCardNumber": "farhan2325"
// }`;
//     const response = await axios.post(`${process.env.SERVER_URL_DOTNET}api/PersonRegisters`, {
//       newpers,
//     });

//     console.log("postJsonToApi.response: ", response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error posting XML data to API:', error);
//     if (error.response) {
//       console.log('Response data:', error.response.data);
//       console.log('Response status:', error.response.status);
//       console.log('Response headers:', error.response.headers);
//     }
//   }
// };


module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
  getPersonByCardNoEndNoPolNo,
  postJsonToApi,
};
