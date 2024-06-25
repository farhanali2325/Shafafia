import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPersonForm = () => {
  const router = useRouter();
  const { data } = router.query;
  const parsedData = JSON.parse(data);
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
    visaNumber: '',
    sponsorNumber: '',
    sponsorCardNumber: '',
    sponsorNameEn: '',
    sponsorNameAr: '',
    endNo: '',
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
        policyNumber: '',
        companyID: '',
        vat: '',
        vatpercent: '',
        collectedPremium: '',
        status: '',
      },
    },
  });
  const [nationalities, setNationalities] = useState([]);
  
  useEffect(() => {
    if (data) {
      setPerson(parsedData.person);
      setNationalities(parsedData.nationValue);
    }
  }, [data]);

  const handleChange = (field, value) => {
    setPerson({
      ...person,
      [field]: value,
    });
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
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}api/persons`, person);
      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      {/* Person Section */}
      <h2>Person</h2>
      <Row>
        <Col md={3}>
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
        <Col md={3}>
          <Form.Group controlId="firstNameEn">
            <Form.Label>First Name (English)</Form.Label>
            <Form.Control
              type="text"
              name="firstNameEn"
              value={person.firstNameEn}
              onChange={(e) => handleChange('firstNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="middleNameEn">
            <Form.Label>Middle Name (English)</Form.Label>
            <Form.Control
              type="text"
              name="middleNameEn"
              value={person.middleNameEn}
              onChange={(e) => handleChange('middleNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="lastNameEn">
            <Form.Label>Last Name (English)</Form.Label>
            <Form.Control
              type="text"
              name="lastNameEn"
              value={person.lastNameEn}
              onChange={(e) => handleChange('lastNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Form.Group controlId="firstNameAr">
            <Form.Label>First Name (Arabic)</Form.Label>
            <Form.Control
              type="text"
              name="firstNameAr"
              value={person.firstNameAr}
              onChange={(e) => handleChange('firstNameAr', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="middleNameAr">
            <Form.Label>Middle Name (Arabic)</Form.Label>
            <Form.Control
              type="text"
              name="middleNameAr"
              value={person.middleNameAr}
              onChange={(e) => handleChange('middleNameAr', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="lastNameAr">
            <Form.Label>Last Name (Arabic)</Form.Label>
            <Form.Control
              type="text"
              name="lastNameAr"
              value={person.lastNameAr}
              onChange={(e) => handleChange('lastNameAr', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
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
      </Row>
      <Row>
        <Col md={3}>
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
        <Col md={3}>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              value={person.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
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
        <Col md={3}>
          <Form.Group controlId="nationalityCode">
            <Form.Label>Nationality Code</Form.Label>
            <Form.Control
              type="text"
              name="nationalityCode"
              value={person.nationalityCode}
              onChange={(e) => handleChange('nationalityCode', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
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
        <Col md={3}>
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
        <Col md={3}>
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
        <Col md={3}>
          <Form.Group controlId="visaNumber">
            <Form.Label>Visa Number</Form.Label>
            <Form.Control
              type="text"
              name="visaNumber"
              value={person.visaNumber}
              onChange={(e) => handleChange('visaNumber', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
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
        <Col md={3}>
          <Form.Group controlId="sponsorCardNumber">
            <Form.Label>Sponsor Card Number</Form.Label>
            <Form.Control
              type="text"
              name="sponsorCardNumber"
              value={person.sponsorCardNumber}
              onChange={(e) => handleChange('sponsorCardNumber', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="sponsorNameEn">
            <Form.Label>Sponsor Name (English)</Form.Label>
            <Form.Control
              type="text"
              name="sponsorNameEn"
              value={person.sponsorNameEn}
              onChange={(e) => handleChange('sponsorNameEn', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="sponsorNameAr">
            <Form.Label>Sponsor Name (Arabic)</Form.Label>
            <Form.Control
              type="text"
              name="sponsorNameAr"
              value={person.sponsorNameAr} onChange={(e) => handleChange('sponsorNameAr', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Member Section */}
        <h2>Member</h2>
        <Row>
          <Col md={3}>
            <Form.Group controlId="memberId">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="text"
                name="memberId"
                value={person.member.id}
                onChange={(e) => handleMemberChange('id', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
            <Form.Group controlId="contractPackageName">
              <Form.Label>Package Name</Form.Label>
              <Form.Control
                type="text"
                name="contractPackageName"
                value={person.member.contract.packageName}
                onChange={(e) => handleContractChange('packageName', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
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
          <Col md={3}>
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
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="contractGrossPremium">
              <Form.Label>Gross Premium</Form.Label>
              <Form.Control
                type="text"
                name="contractGrossPremium"
                value={person.member.contract.grossPremium}
                onChange={(e) => handleContractChange('grossPremium', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contractPolicyHolder">
              <Form.Label>Policy Holder</Form.Label>
              <Form.Control
                type="text"
                name="contractPolicyHolder"
                value={person.member.contract.policyHolder}
                onChange={(e) => handleContractChange('policyHolder', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contractPolicyNumber">
              <Form.Label>Policy Number</Form.Label>
              <Form.Control
                type="text"
                name="contractPolicyNumber"
                value={person.member.contract.policyNumber}
                onChange={(e) => handleContractChange('policyNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contractCompanyID">
              <Form.Label>Company ID</Form.Label>
              <Form.Control
                type="text"
                name="contractCompanyID"
                value={person.member.contract.companyID}
                onChange={(e) => handleContractChange('companyID', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="contractVat">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                name="contractVat"
                value={person.member.contract.vat}
                onChange={(e) => handleContractChange('vat', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contractVatPercent">
              <Form.Label>VAT Percent</Form.Label>
              <Form.Control
                type="text"
                name="contractVatPercent"
                value={person.member.contract.vatpercent}
                onChange={(e) => handleContractChange('vatpercent', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contractCollectedPremium">
              <Form.Label>Collected Premium</Form.Label>
              <Form.Control
                type="text"
                name="contractCollectedPremium"
                value={person.member.contract.collectedPremium}
                onChange={(e) => handleContractChange('collectedPremium', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
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
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EditPersonForm;