import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';

const HorizontalForm = ({ onSearch }) => {
  const [emiratesID, setEmiratesID] = useState('');
  const [medicalCardNumber, setMedicalCardNumber] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchParams = {
      eidNo: emiratesID,
      cardNo: medicalCardNumber,
      fromDate: dateFrom,
      toDate: dateTo,
    };
    
    try {
      const response = await axios.get('http://maneesha-pc:8089/Policy/EndorsementDetails', { params: searchParams });
      onSearch(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  return (
    <Container fluid className={styles.fullWidthContainer}>
      <Form onSubmit={handleSubmit} className={`form-horizontal ${styles.formHorizontal}`}>
        <Row className="align-items-end">
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="emiratesID">
              <Form.Label>Emirates ID</Form.Label>
              <Form.Control
                type="text"
                value={emiratesID}
                onChange={(e) => setEmiratesID(e.target.value)}
                placeholder="Emirates ID"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="medicalCardNumber">
              <Form.Label>Medical Card Number</Form.Label>
              <Form.Control
                type="text"
                value={medicalCardNumber}
                onChange={(e) => setMedicalCardNumber(e.target.value)}
                placeholder="Medical Card Number"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group controlId="dateRangeFrom">
              <Form.Label>Date From</Form.Label>
              <Form.Control
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group controlId="dateRangeTo">
              <Form.Label>Date To</Form.Label>
              <Form.Control
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group>
              <Button type="submit" variant="primary" className={styles.searchButton}>
                <i className="fas fa-search"></i> Search
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default HorizontalForm;
