import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, Upload, User, Mail, Phone, MapPin, Flag } from 'lucide-react';
import "../css/profile.css";

function ProviderProfile() {
  const ae = localStorage.getItem("a_email");
  const navigate = useNavigate();

  const [obj, updateobj] = useState({ 
    email: ae, 
    firstname: "", 
    lastname: "", 
    number: "", 
    ppic: null, 
    idpic: null, 
    pprev: "", 
    idprev: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    company: "",
    website: ""
  });
  const [t, st] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // fetchdetails();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      savepost();
    }
  };

  const update = (event) => {
    const { name, value } = event.target;
    updateobj({ ...obj, [name]: value });
  };

  const pic = (event) => {
    const file = event.target.files[0];
    updateobj({ ...obj, ["ppic"]: file, ["pprev"]: URL.createObjectURL(file) });
  };

  const idpic = (event) => {
    const file = event.target.files[0];
    updateobj({ ...obj, ["idpic"]: file, ["idprev"]: URL.createObjectURL(file) });
  };

  async function savepost() {
    var url = "http://localhost:2002/provider/saveprofile-provider-post";
    var formData = new FormData();
    for (var x in obj) {
      formData.append(x, obj[x]);
    }
    var response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    if (response.data.status) {
      navigate("/pdash");
    }
  }

  async function fetchdetails() {
    var url = "http://localhost:2002/provider/fetch-provider-get?email=" + obj.email;
    var result = await axios.get(url);

    if (result.data.status) {
      var p = "http://localhost:2002/uploads/" + result.data.user.ppic;
      var i = "http://localhost:2002/uploads/" + result.data.user.idpic;
      result.data.user.pprev = p;
      result.data.user.idprev = i;
      updateobj(result.data.user);
    } else {
      st(true);
    }
  }

  async function updatedetails() {
    var url = "http://localhost:2002/provider/updateprofile-provider-post";
    var formData = new FormData();
    for (var x in obj) {
      formData.append(x, obj[x]);
    }
    var response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    if (response.data.status) {
      navigate("/pdash");
    } else {
      alert(response.data.message);
    }
  }

  return (
    <Container className="py-5" style={{ maxWidth: '1200px' }}>
      <div className="text-center mb-4">
        <h2 className="display-4 mb-4" style={{ 
          background: 'linear-gradient(135deg, #6366F1, #818CF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          Provider Profile
        </h2>
      </div>
      
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-white p-4 rounded-3 form_container">
        <Row className="mb-5">
          <Col md={4} className="text-center">
            <div className="position-relative d-inline-block">
              <Image
                src={obj.pprev || '/placeholder.svg?height=150&width=150'}
                alt="Profile Picture"
                roundedCircle
                className="mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 end-0">
                <label className="btn btn-light rounded-circle p-2 shadow-sm" style={{ cursor: 'pointer' }}>
                  <Camera size={20} />
                  <input
                    type="file"
                    onChange={pic}
                    className="d-none"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="firstname">
                  <Form.Label><User size={18} className="me-2" /> First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={obj.firstname}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastname">
                  <Form.Label><User size={18} className="me-2" /> Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={obj.lastname}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label><Mail size={18} className="me-2" /> Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={obj.email}
                    onChange={update}
                    required
                    disabled
                    className="py-2 bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="number">
                  <Form.Label><Phone size={18} className="me-2" /> Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="number"
                    value={obj.number}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>

        <Card className="mb-4 border-0 bg-light">
          <Card.Body className="p-4">
            <h5 className="mb-4">Address Information</h5>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group controlId="address">
                  <Form.Label><MapPin size={18} className="me-2" /> Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={obj.address}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label><MapPin size={18} className="me-2" /> City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={obj.city}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label><MapPin size={18} className="me-2" /> State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={obj.state}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label><Flag size={18} className="me-2" /> Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={obj.country}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="zipcode">
                  <Form.Label><MapPin size={18} className="me-2" /> ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipcode"
                    value={obj.zipcode}
                    onChange={update}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4 border-0 bg-light">
          <Card.Body className="p-4">
            <h5 className="mb-4">Business Information</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="company">
                  <Form.Label><User size={18} className="me-2" /> Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={obj.company}
                    onChange={update}
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="website">
                  <Form.Label><Mail size={18} className="me-2" /> Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={obj.website}
                    onChange={update}
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4 border-0 bg-light">
          <Card.Body className="p-4">
            <h5 className="mb-4">ID Proof</h5>
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label className="mb-0">Upload ID Proof</Form.Label>
              <label className="btn btn-outline-primary btn-sm">
                <Upload size={18} className="me-2" />
                Choose File
                <input
                  type="file"
                  onChange={idpic}
                  className="d-none"
                  accept="image/*"
                />
              </label>
            </div>
            {obj.idprev && (
              <div className="mt-3">
                <Image
                  src={obj.idprev}
                  alt="ID Proof"
                  className="img-thumbnail"
                  style={{ maxHeight: '150px' }}
                />
              </div>
            )}
          </Card.Body>
        </Card>

        <div className="text-end mt-4">
          {t ? (
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              className="px-5"
            >
              Save Profile
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="success" 
              size="lg"
              className="px-5"
              onClick={updatedetails}
            >
              Update Profile
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
}

export default ProviderProfile;