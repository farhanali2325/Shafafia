import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPersonForm = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [person, setPerson] = useState({
      "unifiedNumber": "82187019",
      "firstNameEn": "Kolothodi",
      "middleNameEn": null,
      "lastNameEn": ".",
      "firstNameAr": null,
      "middleNameAr": null,
      "contactNumber": "971553948838",
      "birthDate": "1976-10-09T00:00:00",
      "gender": "M",
      "nationality": "IND",
      "nationalityCode": null,
      "city": null,
      "zipCode": null,
      "passportNumber": "P6236298",
      "emiratesIDNumber": "784-1976-0285968-4",
      "sponsorNumber": null,
      "sponsorNameEn": null,
      "sponsorNameAr": null,
      "member": {
        "id": "78C1A06FDBF15E78", // Medical Car Number
        "relation": "PR",
        "relationTo": null,
        "contract": {
          "packageName": null,
          "grossPremium": 0,
          "vatPercent": 5,
          "renewalDate": null,
          "companyID": null,
          "startDate": "2018-01-01T00:00:00",
          "policyHolder": "",
          "expiryDate": "2018-12-31T00:00:00",
          "collectedPremium": 0,
          "status": "A",
          "vat": 0
          }
        }
});

  // useEffect(() => {
  //   if (id) {
  //     axios.get(`/api/person/${id}`).then((response) => {
  //       setPerson(response.data);
  //     });
  //   }
  // }, [id]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/person/${id}`, person).then(() => {
      router.push('/');
    });
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
          <Col>
            <Form.Group controlId="visaNo">
              <Form.Label>GDRFA/Visa No</Form.Label>
              <Form.Control
                type="text"
                value={person.visaNo}
                onChange={(e) => handleChange('visaNo', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="unifiedId">
              <Form.Label>Unified Id</Form.Label>
              <Form.Control
                type="text"
                value={person.unifiedId}
                onChange={(e) => handleChange('unifiedId', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sponsorNumber">
              <Form.Label>Sponsor Number</Form.Label>
              <Form.Control
                type="text"
                value={person.sponsorNumber}
                onChange={(e) => handleChange('sponsorNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
            <Form.Group controlId="sponsorCardNumber">
              <Form.Label>Sponsor Card Number</Form.Label>
              <Form.Control
                type="text"
                value={person.sponsorCardNumber}
                onChange={(e) => handleChange('sponsorCardNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sponsorNameEn">
              <Form.Label>Sponsor Name (En)</Form.Label>
              <Form.Control
                type="text"
                value={person.sponsorNameEn}
                onChange={(e) => handleChange('sponsorNameEn', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sponsorNameAr">
              <Form.Label>Sponsor Name (Ar)</Form.Label>
              <Form.Control
                type="text"
                value={person.sponsorNameAr}
                onChange={(e) => handleChange('sponsorNameAr', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="memberID">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="text"
                value={person.member.id}
                onChange={(e) => handleMemberChange('id', e.target.value)}
              />
            </Form.Group>
          </Col>         
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="membcerCardNumber">
              <Form.Label>Membcer Card Number</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.membcerCardNumber}
                onChange={(e) => handleContractChange('membcerCardNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
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
        </Row>
        <Row>
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
          <Col>
            <Form.Group controlId="renewalDate">
              <Form.Label>Renewal Date</Form.Label>
              <Form.Control
                type="text"
                value={person.member.renewalDate}
                onChange={(e) => handleMemberChange('renewalDate', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.expiryDate}
                onChange={(e) => handleContractChange('expiryDate', e.target.value)}
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
            <Form.Group controlId="policyNumber">
              <Form.Label>Policy Number</Form.Label>
              <Form.Control
                type="text"
                value={person.member.contract.policyNumber}
                onChange={(e) => handleContractChange('policyNumber', e.target.value)}
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
        <Row>
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
        </Row>
        <Button className="mt-3" variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditPersonForm;