import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Car, User, Mail, Phone, CreditCard, Truck } from 'lucide-react';
import "../css/fillslots.css";

function Book() {
  const ae = localStorage.getItem("a_email");
  var navigate = useNavigate();

  const [obj, updateobj] = useState({
    aemail: ae,
    email: "",
    name: "",
    number: "",
    licenseplate: "",
    model: "",
    slotno: ""
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log("object:" + JSON.stringify(obj));
    //  fetchdetails();
  }, []);

  const update = (event) => {
    var { name, value } = event.target;
    updateobj({ ...obj, [name]: value });
  };

  async function fetchdetails() {
    var url = "http://localhost:2002/provider/fetch-freespace-get?name=" + ae;
    var result = await axios.get(url);

    if (result.data.status) {
      updateobj({...obj, slotno: result.data.user.slotno});
    } else {
      alert("NO SLOT AVAILABLE");
      navigate("/pdash");
    }
  }

  async function bookslot() {
    var url = "http://localhost:2002/provider/fillslot-post";
    alert(JSON.stringify(obj));
    var response = await axios.post(url, obj);
    if (response.data.status) {
      navigate("/pdash");
    } else {
      alert(response.data.message);
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: '1000px' }}>
      <div className="text-center mb-5">
        <h2 className="display-4 mb-4" style={{ 
          background: 'linear-gradient(135deg, #6366F1, #818CF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          marginTop: '-20px'
        }}>
          Book a Parking Slot
        </h2>
      </div>

      <Card className="border-0 form_container">
        <Card.Body className="p-4">
          <Form noValidate validated={validated}>
            <Card className="mb-4 border-0 background_tint">
              <Card.Body className="p-4">
                <h5 className="mb-4">Personal Information</h5>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="name"
                        value={obj.name}
                        onChange={update}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={obj.email}
                        onChange={update}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="number">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter contact number"
                        name="number"
                        value={obj.number}
                        onChange={update}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4 border-0 background_tint">
              <Card.Body className="p-4">
                <h5 className="mb-4">Vehicle Information</h5>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group controlId="licenseplate">
                      <Form.Label>License Plate Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter license plate number"
                        name="licenseplate"
                        value={obj.licenseplate}
                        onChange={update}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="model">
                      <Form.Label>Vehicle Model</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter vehicle model"
                        name="model"
                        value={obj.model}
                        onChange={update}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between align-items-center">
              <Button 
                variant="outline-secondary"
                size="lg"
                className="px-5"
                onClick={fetchdetails}
              >
                Check Availability
              </Button>
              <Button 
                variant="primary" 
                size="lg"
                className="px-5"
                onClick={bookslot}
              >
                Book Slot
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Book;