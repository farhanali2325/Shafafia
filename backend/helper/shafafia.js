const axios = require('axios');
const https = require('https');

// Example data
const data = {
  unifiedNumber: "123456",
  firstNameEn: "John",
  middleNameEn: "Doe",
  lastNameEn: "Smith",
  firstNameAr: "جون",
  middleNameAr: "دو",
  lastNameAr: "سميث",
  contactNumber: "1234567890",
  birthDate: "1980-01-01",
  gender: "Male",
  nationality: "American",
  nationalityCode: "US",
  city: "New York",
  passportNumber: "A1234567",
  emiratesIDNumber: "784-1980-1234567-1",
  visaNumber: "V123456",
  sponsorNumber: "S123456",
  sponsorCardNumber: "SC123456",
  sponsorNameEn: "Company XYZ",
  sponsorNameAr: "شركة XYZ",
  endNo: "EN123456",
  member: {
    id: "M123456",
    relation: "Self",
    relationTo: "123456",
    contract: {
      packageName: "Premium",
      startDate: "2023-01-01",
      renewalDate: "2024-01-01",
      expiryDate: "2025-01-01",
      grossPremium: "1000",
      policyHolder: "Company XYZ",
      policyNumber: "P123456",
      companyID: "C123456",
      vat: "50",
      vatPercent: "5",
      collectedPremium: "1050",
      status: "Active"
    }
  }
};

// Convert the data to a base64-encoded JSON string
const base64Content = Buffer.from(JSON.stringify(data)).toString('base64');
const userName = "NationalGeneralInsurance";
const password = "$$*&%$$Ngi#*&)01@ngi";

// Create the SOAP request payload
const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <UploadTransaction xmlns="https://www.shafafiya.org/v2/">
      <login>${userName}</login>
      <pwd>${password}</pwd>
      <fileContent>${base64Content}</fileContent>
      <fileName>NGITest.xml</fileName>
    </UploadTransaction>
  </soap:Body>
</soap:Envelope>`;

// Create a custom https agent with legacy renegotiation enabled
const httpsAgent = new https.Agent({
    secureOptions: require('constants').SSL_OP_LEGACY_SERVER_CONNECT,
  });
  
  // Log the request for debugging
  console.log('SOAP Request:', soapRequest);
  
  // Send the SOAP request using axios
  axios.post('https://shafafiyapte.doh.gov.ae/v3/webservices.asmx', soapRequest, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'https://www.shafafiya.org/v2/UploadTransaction'
    },
    httpsAgent: httpsAgent
  })
  .then(response => {
    // Handle the response
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Handle any errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request data:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  });