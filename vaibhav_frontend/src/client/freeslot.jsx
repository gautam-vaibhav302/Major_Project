import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from './CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div>
                <br />
                <CustomNavbar />
                <br />
                <br />
            </div>
            <div>
                <Container>
                    <Form noValidate validated={validated}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                               
                                <div>Slotno:</div>
                                <Form.Control
                                    
                                    type="text"
                                    placeholder="slotno"
                                    required
                                    name="slotno"
                                    value={obj.slotno}
                                    onChange={update}
                                />
                                
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid number.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                            
                                <div >License plate no:</div>
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
                        </Row>

                        <Button type="button" onClick={savepost}>
                            Generate Bill
                        </Button>
                    </Form>
                </Container>
            </div>
            <p>{JSON.stringify(obj)}</p>  
        </div>
    );
}

export default Free;
