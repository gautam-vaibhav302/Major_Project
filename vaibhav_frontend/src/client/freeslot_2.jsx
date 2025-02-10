import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNavbar from './CustomNavbar';
import { Car, Hash } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/freeslot.css";

function Free() {
    const ae = localStorage.getItem("a_email");
    const navigate = useNavigate();

    const [obj, updateobj] = useState({
        aemail: ae,
        licenseplate: "",
        slotno: ""
    });

    const [p, updatep] = useState("");

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        console.log("object:" + JSON.stringify(obj));
        // fetchrate();
    }, []);

    const fetchrate = async () => {
        const url = "http://localhost:2002/provider/rate-post";

        const response = await axios.post(url, { email: obj.aemail });
        if (response.data.status) {
            updatep(response.data.price);
        }
    }

    const update = (event) => {
        const { name, value } = event.target;
        updateobj({ ...obj, [name]: value });
    };

    async function savepost() {
        const url = "http://localhost:2002/provider/freeparking-post";
        const formData = new FormData();

        for (const x in obj) {
            formData.append(x, obj[x]);
        }

        const response = await axios.post(url, formData);
        const bill = p * response.data.time;
        alert("BILL=" + bill);

        if (response.data.status) {
            navigate("/pdash");
        }
    }

    return (
        <div>
            <Container className="py-4" style={{ maxWidth: '800px' }}>
                <div className="text-center mb-5">
                    <h2 className="display-4 mb-4" style={{ 
                        background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        marginTop: '-20px'
                    }}>
                        Free Parking Slot
                    </h2>
                </div>

                <Card className="border-0 form_container">
                    <Card.Body className="p-4">
                        <Form noValidate validated={validated}>
                            <Card className="mb-4 border-0 background_tint">
                                <Card.Body className="p-4">
                                    <h5 className="mb-4">Slot Information</h5>
                                    <Row className="g-4">
                                        <Col md={6}>
                                            <Form.Group controlId="slotno">
                                                <Form.Label>
                                                    <Hash className="me-2" size={18} />
                                                    Slot Number
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter slot number"
                                                    name="slotno"
                                                    value={obj.slotno}
                                                    onChange={update}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid slot number.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="licenseplate">
                                                <Form.Label>
                                                    <Car className="me-2" size={18} />
                                                    License Plate Number
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter license plate number"
                                                    name="licenseplate"
                                                    value={obj.licenseplate}
                                                    onChange={update}
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid license plate number.
                                                </Form.Control.Feedback>
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
                                    onClick={fetchrate}
                                >
                                    Fetch Rate
                                </Button>
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    className="px-5"
                                    onClick={savepost}
                                >
                                    Generate Bill
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Free;