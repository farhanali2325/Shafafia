import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        vatPercent: '',
        collectedPremium: '',
        status: '',
      },
    },
  });

  useEffect(() => {
    if (data) {
      setPerson(JSON.parse(data));
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}api/person`, person);
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
        <Row>
          <Col md={3}>
            <Form.Group controlId="unifiedNumber">
              <Form.Label>Unified Number</Form.Label>
              <Form.Control
                type="text"
                name="unifiedNumber"
                value={person.unifiedNumber}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="nationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={person.nationality}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="nationalityCode">
              <Form.Label>Nationality Code</Form.Label>
              <Form.Control
                type="text"
                name="nationalityCode"
                value={person.nationalityCode}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="visaNumber">
              <Form.Label>GDRA/Visa.No</Form.Label>
              <Form.Control
                type="text"
                name="visaNumber"
                value={person.visaNumber}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="sponsorNameAr">
              <Form.Label>Sponsor Name (Arabic)</Form.Label>
              <Form.Control
                type="text"
                name="sponsorNameAr"
                value={person.sponsorNameAr}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="member.id">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="text"
                name="member.id"
                value={person.member.id}
                onChange={handleMemberChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.relation">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                name="member.relation"
                value={person.member.relation}
                onChange={handleMemberChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.relationTo">
              <Form.Label>Relation To</Form.Label>
              <Form.Control
                type="text"
                name="member.relationTo"
                value={person.member.relationTo}
                onChange={handleMemberChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.packageName">
              <Form.Label>Package Name</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.packageName"
                value={person.member.contract.packageName}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="member.contract.startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.startDate"
                value={person.member.contract.startDate}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.renewalDate">
              <Form.Label>Renewal Date</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.renewalDate"
                value={person.member.contract.renewalDate}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.expiryDate"
                value={person.member.contract.expiryDate}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.grossPremium">
              <Form.Label>Gross Premium</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.grossPremium"
                value={person.member.contract.grossPremium}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="member.contract.policyHolder">
              <Form.Label>Policy Holder</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.policyHolder"
                value={person.member.contract.policyHolder}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.policyNumber">
              <Form.Label>Policy Number</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.policyNumber"
                value={person.member.contract.policyNumber}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.companyID">
              <Form.Label>Company ID</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.companyID"
                value={person.member.contract.companyID}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.vat">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.vat"
                value={person.member.contract.vat}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="member.contract.vatPercent">
              <Form.Label>VAT Percent</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.vatPercent"
                value={person.member.contract.vatpercent}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.collectedPremium">
              <Form.Label>Collected Premium</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.collectedPremium"
                value={person.member.contract.collectedPremium}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="member.contract.status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="member.contract.status"
                value={person.member.contract.status}
                onChange={handleContractChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EditPersonForm;