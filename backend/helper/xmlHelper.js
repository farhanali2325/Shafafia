// helpers/xmlHelper.js
const js2xmlparser = require("js2xmlparser");

/**
 * Converts a JSON object to the specified XML format.
 * @param {Object} person - The person object to be converted to XML.
 * @param {Object} header - The header information to be included in the XML.
 * @returns {String} - The generated XML string.
 */
function convertJsonToXml(person, header) {
  // Combining everything into the final structure
  const finalObject = {
    Header: header,
    Person: person
  };

  // Converting JSON to XML with the specific root element and namespaces
  const xml = js2xmlparser.parse("Person.Register", finalObject, {
    declaration: {
      include: true
    },
    attributeString: {
      "xmlns:tns": "http://www.haad.ae/DataDictionary/CommonTypes",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:noNamespaceSchemaLocation": "http://www.haad.ae/DataDictionary/CommonTypes/PersonRegister.xsd"
    }
  });

  return xml;
}

module.exports = {
  convertJsonToXml
};



const person = {
    unifiedNumber: "47318284",
    firstNameEn: "LINA TAISER DIAB MOHD",
    middleNameEn: "TAISER",
    lastNameEn: "DIAB MOHD",
    firstNameAr: "لينا تيسير ذياب محمد",
    middleNameAr: "تيسير",
    lastNameAr: "محمد ذياب",
    contactNumber: "0527993472",
    birthDate: "17/04/1992",
    gender: "0",
    nationality: "Jordanian",
    nationalityCode: "3",
    city: "ABU DHABI",
    passportNumber: "Q639300",
    emiratesIDNumber: "784-1992-1632171-3",
    visaNumber: "",
    sponsorNumber: "38749916",
    sponsorCardNumber: "",
    sponsorNameEn: "YASAR ALI FAREED KHLAIF",
    sponsorNameAr: "يسار على فريد خليف",
    endNo: "",
    member: {
        id: "102-103-0006284001-01",
        relation: "Spouse",
        relationTo: "102-103-0006050601-01",
        contract: {
            packageName: "53499",
            startDate: "01/06/2021",
            renewalDate: "01/06/2021",
            expiryDate: "31/05/2025",
            grossPremium: "9172",
            policyHolder: "6",
            policyNumber: "",
            companyID: "P/08/2024/000239",
            vat: "458.6",
            vatPercent: "5",
            collectedPremium: "9630.6",
            status: "New",
        }
    }
};

// Additional required data for the header
const header = {
    SenderID: "A025",
    ReceiverID: "HAAD",
    TransactionDate: "23/06/2024 12:29",
    RecordCount: 1,
    DispositionFlag: "PRODUCTION"
};

// Combining everything into the final structure
const finalObject = {
    Header: header,
    Person: person
};

// Converting JSON to XML with the specific root element and namespaces
const xml = js2xmlparser.parse("Person.Register", finalObject, {
    declaration: {
        include: true
    },
    attributeString: {
        "xmlns:tns": "http://www.haad.ae/DataDictionary/CommonTypes",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:noNamespaceSchemaLocation": "http://www.haad.ae/DataDictionary/CommonTypes/PersonRegister.xsd"
    }
});

console.log(xml);