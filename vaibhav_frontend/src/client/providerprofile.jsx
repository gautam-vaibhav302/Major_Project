import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, Upload } from 'lucide-react';

function PProf() {
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
    idprev: "" 
  });
  const [t, st] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetchdetails();
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
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-4">
        <h2 className="mb-4">Provider Profile</h2>
      </div>
      
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-white p-4 rounded-3 shadow-sm">
        {/* Profile Picture Section */}
        <div className="text-center mb-5">
          <div className="position-relative d-inline-block">
            <Image
              src={obj.pprev || '/placeholder.svg?height=120&width=120'}
              alt="Profile Picture"
              roundedCircle
              className="mb-3"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
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
        </div>

        {/* Form Fields */}
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={obj.firstname}
                onChange={update}
                required
                className="py-2"
              />
            </Form.Group>
          </div>
          
          <div className="col-md-6">
            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={obj.lastname}
                onChange={update}
                required
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-12">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
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
          </div>

          <div className="col-12">
            <Form.Group controlId="number">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                name="number"
                value={obj.number}
                onChange={update}
                required
                className="py-2"
              />
            </Form.Group>
          </div>

          {/* ID Proof Section */}
          <div className="col-12">
            <Form.Group controlId="idproof" className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label className="mb-0">ID Proof</Form.Label>
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
                <div className="mt-2">
                  <Image
                    src={obj.idprev}
                    alt="ID Proof"
                    className="img-thumbnail"
                    style={{ maxHeight: '100px' }}
                  />
                </div>
              )}
            </Form.Group>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-end mt-4">
          {t ? (
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              className="px-4"
            >
              Save Profile
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="success" 
              size="lg"
              className="px-4"
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

export default PProf;

