const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  unifiedNumber: String,
  firstNameEn: String,
  middleNameEn: String,
  lastNameEn: String,
  firstNameAr: String,
  middleNameAr: String,
  lastNameAr: String,
  contactNumber: String,
  birthDate: String,
  gender: String,
  nationality: String,
  nationalityCode: String,
  city: String,
  passportNumber: String,
  emiratesIDNumber: String,
  visaNumber: String,
  sponsorNumber: String,
  sponsorCardNumber: String,
  sponsorNameEn: String,
  sponsorNameAr: String,
  endNo: String,
  member: {
    id: String,
    relation: String,
    relationTo: String,
    contract: {
      packageName: String,
      startDate: String,
      renewalDate: String,
      expiryDate: String,
      grossPremium: String,
      policyHolder: String,
      policyNumber: String,
      companyID: String,
      vat: String,
      vatPercent: String,
      collectedPremium: String,
      status: String,
    },
  },
}, { collection: 'person' });

module.exports = mongoose.model('Person', personSchema);