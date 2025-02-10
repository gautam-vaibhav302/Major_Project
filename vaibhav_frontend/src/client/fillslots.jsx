import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Book() {
    const ae = localStorage.getItem("a_email");
  var navigate = useNavigate();

  const [obj, updateobj] = useState({
    aemail:ae,
    email: "",
    name: "",
    number:"",
    licenseplate:"",
    model:"",
    slotno:""
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
      updateobj({...obj,slotno:result.data.user.slotno});
    }
    else
    {
      alert("NO SLOT AVAILABLE");
      navigate("/pdash");
    }
    
  }

  async function bookslot() {

    var url = "http://localhost:2002/provider/fillslot-post";
   alert(JSON.stringify(obj));
    var response = await axios.post(url,obj);
    if (response.data.status) {
      navigate("/pdash");
    } else {
      alert(response.data.message);
    }
  }

  return (
    <div>
      <div>
        <br />
        <h1>BOOK SLOT</h1>
        <br />
        <br />
      </div>
      <Container>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="inputGroupPrepend"
                required
                placeholder="name"
                name="name"
                value={obj.name}
                onChange={update}
                // disabled
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="inputGroupPrepend"
                required
                placeholder="email"
                name="email"
                value={obj.email}
                onChange={update}
                // disabled
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
         </Row>
           
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Contact Number:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number"
                required
                name="number"
                value={obj.number}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>License plate no</Form.Label>
              <Form.Control
                type="text"
                placeholder="plateno"
                required
                name="licenseplate"
                value={obj.licenseplate}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>model</Form.Label>
              <Form.Control
                type="text"
                placeholder="model"
                required
                name="model"
                value={obj.model}
                onChange={update}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

         
          
            <Button type="button" onClick={bookslot}>
              Book
            </Button>
          
        </Form>
      </Container>
      <p>{JSON.stringify(obj)}</p>
    </div>
  );
}

export default Book;
