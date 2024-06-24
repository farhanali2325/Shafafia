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