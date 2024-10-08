import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../styles/Home.module.css'

const EditPersonForm = () => {
  const router = useRouter();
  const { data } = router.query;
  const [person, setPerson] = useState({
    unifiedNumber: '',
    firstNameEn: '',
    middleNameEn: '',
    lastNameEn: '',
    firstNameAr: '',
    middleNameAr: '',
    lastNameAr: '',
    contactNumber: '',
    birthDate: '',
    gender: '',
    nationality: '',
    nationalityCode: '',
    city: '',
    passportNumber: '',
    emiratesIDNumber: '',
    sponsorNumber: '',
    sponsorNameEn: '',
    sponsorNameAr: '',
    endSrl: '',
    uploadStatus: '',
    uploadResponse: '',
    member: {
      id: '',
      relation: '',
      relationTo: '',
      contract: {
        packageName: '',
        startDate: '',
        renewalDate: '',
        expiryDate: '',
        grossPremium: '',
        policyHolder: '',
        companyID: '',
        vat: '',
        vatpercent: '',
        collectedPremium: '',
        status: '',
      },
    },
  });
  const [nationalities, setNationalities] = useState([]);
  const [csvFilePath, setCSVFilePath] = useState();
  const [xmlFilePath, setXMLFilePath] = useState();
  const [loading, setLoading] = useState(false); // Add loading state
  
  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      setPerson(parsedData);
    }
  }, [data]);

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}Policy/GetNationality`);
        setNationalities(response.data);
      } catch (error) {
        console.error('Error:', error);
        alert('Error:', error.message);
      }
    };
    fetchNationalities();
  }, []);

  const downloadCsv = async () => {
      if(csvFilePath){
        try {
          const response = await axios({
            url: `${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}Policy/Download-csv`, 
            method: 'GET',
            params: {
              filePath: csvFilePath // Pass dynamic file path here
            },
            responseType: 'blob', // Important: responseType as 'blob' for binary data
          });
      
          // Create a link element and click it to trigger the download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          
          // Extract file name from the response headers if available
          const contentDisposition = response.headers['content-disposition'];
          let fileName = `${person.member.id}.csv`; // Default file name
          if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match.length > 1) {
              fileName = match[1];
            }
          }
      
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
      
          // Clean up: remove the temporary link
          link.parentNode.removeChild(link);
      
        } catch (error) {
          console.error('Error downloading file:', error);
          // Handle error
        }
      }
  };

  const downloadXML = async () => {
    if (xmlFilePath) {
      try {
        const response = await axios({
          url: `${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}Policy/Download-csv`, 
          method: 'GET',
          params: {
            filePath: xmlFilePath, // Pass dynamic file path here
          },
          responseType: 'blob', // Important: responseType as 'blob' for binary data
          headers: {
            'Accept': 'application/xml', // Ensure the request expects an XML response
          }
        });
    
        // Create a link element and click it to trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        
        // Extract file name from the response headers if available
        const contentDisposition = response.headers['content-disposition'];
        let fileName = `${person.member.id}.xml`; // Default file name
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="(.+)"/);
          if (match && match.length > 1) {
            fileName = match[1];
          }
        }
    
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    
        // Clean up: remove the temporary link
        document.body.removeChild(link);
    
      } catch (error) {
        console.error('Error downloading file:', error);
        // Handle error
      }
    }
  };

const handleChange = (field, value) => {
  if (field === 'nationality') {
    const selectedNationality = nationalities.find(n => n.nationValue === value);
    const nationalityCode = selectedNationality.nationCode ? selectedNationality.nationCode : ''; // Replace 'code' with the actual property name for nationality code
    setPerson({
      ...person,
      nationality: value,
      nationalityCode: nationalityCode,
    });
  } else {
    setPerson({
      ...person,
      [field]: value,
    });
  }
};

  const handleMemberChange = (field, value) => {
    setPerson({
      ...person,
      member: {
        ...person.member,
        [field]: value,
      },
    });
  };

  const handleContractChange = (field, value) => {
    setPerson({
      ...person,
      member: {
        ...person.member,
        contract: {
          ...person.member.contract,
          [field]: value,
        },
      },
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const fileInfoResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_DOTNET}api/PersonRegisters`, person);
      if (fileInfoResponse.data) {
        // Set uploadStatus and uploadResponse in person object
        person.uploadStatus = fileInfoResponse.data.status;
        person.uploadResponse = fileInfoResponse.data.errors;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_JAVA}Policy/CreatePersonEntry`, person);
        if (response.data) {
          setCSVFilePath(fileInfoResponse.data.csvFilePath);
          setXMLFilePath(fileInfoResponse.data.xmlFilePath);
          alert('Form submitted successfully');
        }
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setCSVFilePath('');
      alert('Error submitting form');
    } finally {
      setLoading(false); // Set loading to false when response is received or error occurs
    }
  };

  return (
    <Container className={`${style.fullWidthContainer} pb-3 mt-3 mb-6`}>
    <Form onSubmit={handleSubmit}>
      {/* Person Section */}
      <h2>Person</h2>
      <Row>
        <Col md={2}>
          <Form.Group controlId="unifiedNumber">
            <Form.Label>Unified Number</Form.Label>
            <Form.Control
              type="text"
              name="unifiedNumber"
              value={person.unifiedNumber}
              onChange={(e) => handleChange('unifiedNumber', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="firstNameEn">
            <Form.Label>First Name (En)</Form.Label>
            <Form.Control
              type="text"
              name="firstNameEn"
              value={person.firstNameEn}
              onChange={(e) => handleChange('firstNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="middleNameEn">
            <Form.Label>Middle Name (En)</Form.Label>
            <Form.Control
              type="text"
              name="middleNameEn"
              value={person.middleNameEn}
              onChange={(e) => handleChange('middleNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="lastNameEn">
            <Form.Label>Last Name (En)</Form.Label>
            <Form.Control
              type="text"
              name="lastNameEn"
              value={person.lastNameEn}
              onChange={(e) => handleChange('lastNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="firstNameAr">
            <Form.Label>First Name (Ar)</Form.Label>
            <Form.Control
              type="text"
              name="firstNameAr"
              value={person.firstNameAr}
              onChange={(e) => handleChange('firstNameAr', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <Form.Group controlId="middleNameAr">
            <Form.Label>Middle Name (Ar)</Form.Label>
            <Form.Control
              type="text"
              name="middleNameAr"
              value={person.middleNameAr}
              onChange={(e) => handleChange('middleNameAr', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="lastNameAr">
            <Form.Label>Last Name (Ar)</Form.Label>
            <Form.Control
              type="text"
              name="lastNameAr"
              value={person.lastNameAr}
              onChange={(e) => handleChange('lastNameAr', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contactNumber"
              value={person.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="birthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="text"
              name="birthDate"
              value={person.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              value={person.gender === "0" ? "Female" : "Male"}
              onChange={(e) => handleChange('gender', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <Form.Group controlId="nationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              as="select"
              name="nationality"
              value={person.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
            >
              <option value="">Select Nationality</option>
              {nationalities.map((nationality) => (
                <option key={nationality.nationValue} value={nationality.nationValue}>
                  {nationality.nationValue}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        {/* test */}
        <Col md={2}> 
          <Form.Group controlId="nationalityCode">
            <Form.Label>Nationality Code</Form.Label>
            <Form.Control
              type="text"
              name="nationalityCode"
              value={person.nationalityCode}
              readOnly
              disabled
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={person.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="passportNumber">
            <Form.Label>Passport Number</Form.Label>
            <Form.Control
              type="text"
              name="passportNumber"
              value={person.passportNumber}
              onChange={(e) => handleChange('passportNumber', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="emiratesIDNumber">
            <Form.Label>Emirates ID Number</Form.Label>
            <Form.Control
              type="text"
              name="emiratesIDNumber"
              value={person.emiratesIDNumber}
              onChange={(e) => handleChange('emiratesIDNumber', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
       
        <Col md={2}>
          <Form.Group controlId="sponsorNumber">
            <Form.Label>Sponsor Number</Form.Label>
            <Form.Control
              type="text"
              name="sponsorNumber"
              value={person.sponsorNumber}
              onChange={(e) => handleChange('sponsorNumber', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="sponsorNameEn">
            <Form.Label>Sponsor Name (En)</Form.Label>
            <Form.Control
              type="text"
              name="sponsorNameEn"
              value={person.sponsorNameEn}
              onChange={(e) => handleChange('sponsorNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="sponsorNameAr">
            <Form.Label>Sponsor Name (Ar)</Form.Label>
            <Form.Control
              type="text"
              name="sponsorNameAr"
              value={person.sponsorNameAr} onChange={(e) => handleChange('sponsorNameAr', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
          <Form.Group controlId="uploadStatus">
            <Form.Label>upload Status</Form.Label>
            <Form.Control
              type="text"
              name="uploadStatus"
              value={person.uploadStatus == "NA" ? "Error" : person.uploadStatus == 1 ? "Success" : `Error: ${person.uploadResponse}`}
              readOnly
              style={{
                color: person.uploadStatus == "NA" ? 'red' : person.uploadStatus == 1 ?  'green' : 'red',
                fontWeight: 'bold' // Set fontWeight to 'bold' for bold text
              }}
            />
          </Form.Group>
        </Col>
      </Row>

        {/* Member Section */}
        
        <h2>Member</h2>
        <Row>
          <Col md={2}>
            <Form.Group controlId="memberId">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="text"
                name="memberId"
                value={person.member.id}
                onChange={(e) => handleMemberChange('id', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="memberRelation">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                name="memberRelation"
                value={person.member.relation}
                onChange={(e) => handleMemberChange('relation', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="memberRelationTo">
              <Form.Label>Relation To</Form.Label>
              <Form.Control
                type="text"
                name="memberRelationTo"
                value={person.member.relationTo}
                onChange={(e) => handleMemberChange('relationTo', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Contract Section */}
        <h2>Contract</h2>
        <Row>
          <Col md={2}>
            <Form.Group controlId="contractPackageName">
              <Form.Label>Package Name</Form.Label>
              <Form.Control
                type="text"
                name="contractPackageName"
                value={person.member.contract.packageName}
                onChange={(e) => handleContractChange('packageName', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contractStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="text"
                name="contractStartDate"
                value={person.member.contract.startDate}
                onChange={(e) => handleContractChange('startDate', e.target.value)}
                
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contractRenewalDate">
              <Form.Label>Renewal Date</Form.Label>
              <Form.Control
                type="text"
                name="contractRenewalDate"
                value={person.member.contract.renewalDate}
                onChange={(e) => handleContractChange('renewalDate', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contractExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                name="contractExpiryDate"
                value={person.member.contract.expiryDate}
                onChange={(e) => handleContractChange('expiryDate', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contractGrossPremium">
              <Form.Label>Gross Premium</Form.Label>
              <Form.Control
                type="text"
                name="contractGrossPremium"
                value={person.member.contract.grossPremium}
                onChange={(e) => handleContractChange('grossPremium', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
         
          <Col md={2}>
            <Form.Group controlId="contractPolicyHolder">
              <Form.Label>Policy Holder</Form.Label>
              <Form.Control
                type="text"
                name="contractPolicyHolder"
                value={person.member.contract.policyHolder}
                onChange={(e) => handleContractChange('policyHolder', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
         
          <Col md={2}>
            <Form.Group controlId="contractCompanyID">
              <Form.Label>Company ID</Form.Label>
              <Form.Control
                type="text"
                name="contractCompanyID"
                value={person.member.contract.companyID}
                onChange={(e) => handleContractChange('companyID', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contractVat">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                name="contractVat"
                value={person.member.contract.vat}
                onChange={(e) => handleContractChange('vat', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contractVatPercent">
              <Form.Label>VAT Percent</Form.Label>
              <Form.Control
                type="text"
                name="contractVatPercent"
                value={person.member.contract.vatpercent}
                onChange={(e) => handleContractChange('vatpercent', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="contractCollectedPremium">
              <Form.Label>Collected Premium</Form.Label>
              <Form.Control
                type="text"
                name="contractCollectedPremium"
                value={person.member.contract.collectedPremium}
                onChange={(e) => handleContractChange('collectedPremium', e.target.value)}
                readOnly
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Form.Group controlId="contractStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="contractStatus"
                value={person.member.contract.status}
                onChange={(e) => handleContractChange('status', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Submit Button */}
        <Row>
          <Col md={2} className="mt-3 mb-6">
            <Button variant="primary" type="submit">
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Col>
          {csvFilePath && (  
            <Col md={2} className="mt-3 mb-6">
              <Button variant="secondary" type="button" onClick={downloadCsv}>
                Download CSV
              </Button>
              <Button variant="secondary" type="button" onClick={downloadXML}>
                Download XML
              </Button>            
            </Col>
          )}
        </Row>
      </Form>
      {loading && (
        <div className={`${style.loadingOverlay}`}>
          <div className={`${style.loader}`}></div>
        </div>
      )}
    </Container>
  );
};

export default EditPersonForm;