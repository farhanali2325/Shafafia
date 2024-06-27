const Endorsement = require('../models/endorsment');

// GET all persons
const getAllEndorsments = async (req, res) => {
    try {
      const { cardNo, eidNo, fromDate, toDate } = req.body;
  
      // Build query conditions based on cardNo (required) and optional parameters
      const conditions = { cardNo };
  
      if (eidNo) conditions.eidNo = eidNo;
  
      if (fromDate && toDate) {
        conditions.entryDate = {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        };
      } else if (fromDate) {
        conditions.entryDate = { $gte: new Date(fromDate) };
      } else if (toDate) {
        conditions.entryDate = { $lte: new Date(toDate) };
      }
  
      // Query endorsements using conditions
      const endorsements = await Endorsement.find(conditions);
      res.json(endorsements);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createEndorsments = async (req, res) => {
    try {
        const endorsements = req.body;
        const savedEndorsements = await Promise.all(endorsements.map(async (endorsementData) => {
          const endorsement = new Endorsement(endorsementData);
          return await endorsement.save();
        }));
        return savedEndorsements;
      } catch (error) {
        throw new Error(`Error saving endorsements: ${error.message}`);
      }
  };

module.exports = {
  getAllEndorsments,
  createEndorsments,
};
