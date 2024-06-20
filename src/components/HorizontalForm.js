import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';

const HorizontalForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    emiratesID: '',
    medicalCardNumber: '',
    dateFrom: '',
    dateTo: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { emiratesID, medicalCardNumber, dateFrom, dateTo } = formData;

    const requestData = {
      eidNo: emiratesID,
      cardNo: medicalCardNumber,
      fromDate: dateFrom,
      toDate: dateTo,
    };

    try {
      const response = await axios.post('http://maneesha-pc:8089/Policy/EndorsementDetails', requestData);
      onSearch(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
                value={formData.emiratesID}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="medicalCardNumber">
              <Form.Label>Medical Card Number</Form.Label>
              <Form.Control
                  type="text"
                  name="medicalCardNumber"
                  value={formData.medicalCardNumber}
                  onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group controlId="dateRangeFrom">
              <Form.Label>Date From</Form.Label>
              <Form.Control
                type="date"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Form.Group controlId="dateRangeTo">
              <Form.Label>Date To</Form.Label>
              <Form.Control
                type="date"
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
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
