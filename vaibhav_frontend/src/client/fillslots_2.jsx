import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Car, User, Mail, Phone, CreditCard, Truck, Camera } from 'lucide-react';
import Webcam from "react-webcam";
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
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

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

  const capture = useCallback(() => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
      } else {
        console.error("Failed to capture image");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }, [webcamRef]);

  return (
    <Container className="py-4" style={{ maxWidth: '1200px' }}>
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

      <Row className="form_container py-4">
        <Col lg={8}>
          <Card className="border-0 background_tint">
            <Card.Body className="p-4">
              <Form noValidate validated={validated}>
                <Card className="mb-4 border-0 background_tint_2">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Personal Information</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="name">
                          <Form.Label><User size={18} className="me-2" /> Name</Form.Label>
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
                          <Form.Label><Mail size={18} className="me-2" /> Email</Form.Label>
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
                          <Form.Label><Phone size={18} className="me-2" /> Contact Number</Form.Label>
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

                <Card className="mb-4 border-0 background_tint_2">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Vehicle Information</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="licenseplate">
                          <Form.Label><CreditCard size={18} className="me-2" /> License Plate Number</Form.Label>
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
                          <Form.Label><Truck size={18} className="me-2" /> Vehicle Model</Form.Label>
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

                <div className="d-flex justify-content-end align-items-center">
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
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100 background_tint">
            <Card.Body className="p-4 d-flex flex-column justify-content-center">
              <h5 className="mb-4 text-center">Capture Image</h5>
              <div className="d-flex justify-content-center mb-3">
                {capturedImage ? (
                  <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', height: 'auto', maxHeight: '250px' }} />
                ) : (
                  <div style={{ maxWidth: '100%', height: '250px' }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "user" }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
              <div className="text-center">
                <Button 
                  variant="primary" 
                  onClick={() => {
                    if (capturedImage) {
                      setCapturedImage(null);
                    } else {
                      capture();
                    }
                  }}
                  className="px-4"
                >
                  <Camera size={20} className="me-2" />
                  {capturedImage ? "Retake" : "Capture"} Image
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Book;