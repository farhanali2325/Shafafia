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

  const convertDateFormat = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fromDate = dateFrom ? convertDateFormat(dateFrom) : '';
    const toDate = dateTo ? convertDateFormat(dateTo) : '';

    const searchParams = {
      eidNo: emiratesID,
      cardNo: medicalCardNumber,
      fromDate,
      toDate,
    };
    
    // Call onSearch function passed from Home.js with searchParams
    onSearch(searchParams);
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
                name="emiratesID" 
                value={emiratesID}
                onChange={(e) => setEmiratesID(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="medicalCardNumber">
              <Form.Label>Medical Card Number</Form.Label>
              <Form.Control
                  type="text"
                  name="medicalCardNumber"
                  value={medicalCardNumber}
                  onChange={(e) => setMedicalCardNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group controlId="dateRangeFrom">
              <Form.Label>Date From</Form.Label>
              <Form.Control
                type="date"
                name="dateFrom"
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
                name="dateTo"
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
