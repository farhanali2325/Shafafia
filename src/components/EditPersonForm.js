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
    contactNumber: '',
    birthDate: '',
    gender: '',
    nationality: '',
    nationalityCode: '',
    city: '',
    passportNumber: '',
    emiratesIDNumber: '',
    member: {
      id: '',
      relation: '',
      relationTo: '',
      contract: {
        packageName: '',
        grossPremium: '',
        vatPercent: '',
        renewalDate: '',
        companyID: '',
        startDate: '',
        policyHolder: '',
        expiryDate: '',
        collectedPremium: '',
        status: '',
        vat: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://xyz.com', person);
      alert('Data updated successfully');
      router.push('/');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };

  return (
    <Container>
      <h1>Edit Person</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="firstNameEn">
              <Form.Label>First Name (En)</Form.Label>
              <Form.Control
                type="text"
                value={person.firstNameEn}
                onChange={(e) => handleChange('firstNameEn', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="middleNameEn">
              <Form.Label>Middle Name (En)</Form.Label>
              <Form.Control
                type="text"
                value={person.middleNameEn}
                onChange={(e) => handleChange('middleNameEn', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastNameEn">
              <Form.Label>Last Name (En)</Form.Label>
              <Form.Control
                type="text"
                value={person.lastNameEn}
                onChange={(e) => handleChange('lastNameEn', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="firstNameAr">
              <Form.Label>First Name (Ar)</Form.Label>
              <Form.Control
                type="text"
                value={person.firstNameAr}
                onChange={(e) => handleChange('firstNameAr', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="middleNameAr">
              <Form.Label>Middle Name (Ar)</Form.Label>
              <Form.Control
                type="text"
                value={person.middleNameAr}
                onChange={(e) => handleChange('middleNameAr', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={person.contactNumber}
                onChange={(e) => handleChange('contactNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="birthDate">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                value={person.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={person.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="nationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                value={person.nationality}
                onChange={(e) => handleChange('nationality', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="nationalityCode">
              <Form.Label>Nationality Code</Form.Label>
              <Form.Control
                type="text"
                value={person.nationalityCode}
                onChange={(e) => handleChange('nationalityCode', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={person.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="passportNumber">
              <Form.Label>Passport Number</Form.Label>
              <Form.Control
                type="text"
                value={person.passportNumber}
                onChange={(e) => handleChange('passportNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="emiratesIDNumber">
              <Form.Label>Emirates ID Number</Form.Label>
              <Form.Control
                type="text"
                value={person.emiratesIDNumber}
                onChange={(e) => handleChange('emiratesIDNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <h2>Member Details</h2>
        <Row>
          <Col>
            <Form.Group controlId="relation">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                value={person.member.relation}
                onChange={(e) => handleMemberChange('relation', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="relationTo">
              <Form.Label>Relation To</Form.Label>
              <Form.Control
                type="text"
                value={person.member.relationTo}
                onChange={(e) => handleMemberChange('relationTo', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <h3>Contract Details</h3>
        <Row>
          <Col>
            <Form.Group controlId="packageName">
              <Form.Label>Package Name</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.packageName}
                onChange={(e) => handleContractChange('packageName', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="grossPremium">
              <Form.Label>Gross Premium</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.grossPremium}
                onChange={(e) => handleContractChange('grossPremium', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="vatPercent">
              <Form.Label>VAT Percent</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.vatPercent}
                onChange={(e) => handleContractChange('vatPercent', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="renewalDate">
              <Form.Label>Renewal Date</Form.Label>
              <Form.Control
                type="date"
                value={person.member.contract.renewalDate}
                onChange={(e) => handleContractChange('renewalDate', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="companyID">
              <Form.Label>Company ID</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.companyID}
                onChange={(e) => handleContractChange('companyID', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={person.member.contract.startDate}
                onChange={(e) => handleContractChange('startDate', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="policyHolder">
              <Form.Label>Policy Holder</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.policyHolder}
                onChange={(e) => handleContractChange('policyHolder', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={person.member.contract.expiryDate}
                onChange={(e) => handleContractChange('expiryDate', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="collectedPremium">
              <Form.Label>Collected Premium</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.collectedPremium}
                onChange={(e) => handleContractChange('collectedPremium', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.status}
                onChange={(e) => handleContractChange('status', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="vat">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.vat}
                onChange={(e) => handleContractChange('vat', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default EditPersonForm;
