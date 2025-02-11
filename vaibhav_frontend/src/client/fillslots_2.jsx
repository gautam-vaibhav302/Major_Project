import { useState, useEffect, useCallback, useRef } from "react"
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { User, Mail, Phone, CreditCard, Truck, Camera } from "lucide-react"
import Webcam from "react-webcam"
import "../css/fillslots.css";

function Book() {
  const ae = localStorage.getItem("a_email")
  const navigate = useNavigate()

  const [obj, updateobj] = useState({
    aemail: ae,
    email: "",
    name: "",
    number: "",
    licenseplate: "",
    model: "",
  })

  const [validated, setValidated] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const webcamRef = useRef(null)

  useEffect(() => {
    console.log("object:" + JSON.stringify(obj))
  }, [obj])

  const update = (event) => {
    const { name, value } = event.target
    updateobj({ ...obj, [name]: value })
  }

  async function fetchdetails() {
    const url = "http://localhost:2002/provider/fetch-freespace-get?name=" + ae
    try {
      const result = await axios.get(url)
      if (result.data.status) {
        updateobj({ ...obj, slotno: result.data.user.slotno })
      } else {
        alert("NO SLOT AVAILABLE")
        navigate("/pdash")
      }
    } catch (error) {
      console.error("Error fetching details:", error)
      alert("Error fetching details. Please try again.")
    }
  }

  async function bookslot() {
    const url = "http://localhost:2002/provider/fillslot-post"
    try {
      const response = await axios.post(url, obj)
      if (response.data.status) {
        navigate("/pdash")
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error("Error booking slot:", error)
      alert("Error booking slot. Please try again.")
    }
  }

  const capture = useCallback(async () => {
    try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            setCapturedImage(imageSrc);
            setIsLoading(true);

            // Convert base64 to blob
            const base64Data = imageSrc.split(",")[1];
            const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());

            // Create FormData and append the blob
            const formData = new FormData();
            formData.append("image", blob, "captured_image.jpg");

            // Send POST request to local API
            let response;  // Declare response here
            try {
                response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Handle success response
                console.log("Success:", response.data);
                alert(response.data.message); // Show success message

                // Update licenseplate field with extracted text
                if (response.data && response.data.extracted_text) {
                    updateobj(prevObj => ({
                        ...prevObj,
                        licenseplate: response.data.extracted_text
                    }));
                }
            } catch (error) {
                // Handle errors
                console.error("Error:", error);
                if (error.response) {
                    alert(`Error: ${error.response.data.message || "Something went wrong"}`);
                } else {
                    alert("Network error or server not responding");
                }
            }
        } else {
            console.error("Failed to capture image");
        }
    } catch (error) {
        console.error("Error capturing image or processing API response:", error);
        alert("Error processing image. Please try again.");
    } finally {
        setIsLoading(false);
    }
}, [webcamRef]);

  // const capture = useCallback(async () => {
  //   try {
  //     const imageSrc = webcamRef.current.getScreenshot()
  //     if (imageSrc) {
  //       setCapturedImage(imageSrc)
  //       setIsLoading(true)

  //       // Convert base64 to blob
  //       const base64Data = imageSrc.split(",")[1]
  //       const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then((res) => res.blob())

  //       // Create FormData and append the blob
  //       const formData = new FormData()
  //       formData.append("image", blob, "captured_image.jpg")

  //       // Send POST request to local API
  //       const response="";
  //       try {
  //           response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //           // withCredentials: true, // Ensures cookies are sent with the request
  //         });
        
  //         // Handle success response
  //         console.log("Success:", response.data);
  //         alert(response.data.message); // Show success message
  //       } catch (error) {
  //         // Handle errors
  //         console.error("Error:", error);
  //         if (error.response) {
  //           alert(`Error: ${error.response.data.message || "Something went wrong"}`);
  //         } else {
  //           alert("Network error or server not responding");
  //         }
  //       }

  //       // Update licenseplate field with extracted text
  //       if (response.data && response.data.extracted_text) {
  //         updateobj((prevObj) => ({ ...prevObj, licenseplate: response.data.extracted_text }))
  //       }
  //     } else {
  //       console.error("Failed to capture image")
  //     }
  //   } catch (error) {
  //     console.error("Error capturing image or processing API response:", error)
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data)
  //       console.error("Error response status:", error.response.status)
  //       console.error("Error response headers:", error.response.headers)
  //     } else if (error.request) {
  //       console.error("No response received:", error.request)
  //     } else {
  //       console.error("Error message:", error.message)
  //     }
  //     alert("Error processing image. Please try again.")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [webcamRef])

  return (
    <Container className="py-4" style={{ maxWidth: "1200px" }}>
      <div className="text-center mb-5">
        <h2
          className="display-4 mb-4"
          style={{
            background: "linear-gradient(135deg, #6366F1, #818CF8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            marginTop: "-20px",
          }}
        >
          Book a Parking Slot
        </h2>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Form noValidate validated={validated}>
                <Card className="mb-4 border-0 bg-light">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Personal Information</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="name">
                          <Form.Label>
                            <User size={18} className="me-2" /> Name
                          </Form.Label>
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
                          <Form.Label>
                            <Mail size={18} className="me-2" /> Email
                          </Form.Label>
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
                          <Form.Label>
                            <Phone size={18} className="me-2" /> Contact Number
                          </Form.Label>
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

                <Card className="mb-4 border-0 bg-light">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Vehicle Information</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="licenseplate">
                          <Form.Label>
                            <CreditCard size={18} className="me-2" /> License Plate Number
                          </Form.Label>
                          <div className="d-flex align-items-center">
                            <Form.Control
                              type="text"
                              placeholder="Enter license plate number"
                              name="licenseplate"
                              value={obj.licenseplate}
                              onChange={update}
                              required
                            />
                            {isLoading && (
                              <div className="ms-2 spinner-border spinner-border-sm text-primary" role="status" />
                            )}
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="model">
                          <Form.Label>
                            <Truck size={18} className="me-2" /> Vehicle Model
                          </Form.Label>
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
                  <Button variant="primary" size="lg" className="px-5" onClick={bookslot}>
                    Book Slot
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4 d-flex flex-column justify-content-center">
              <h5 className="mb-4 text-center">Capture Image</h5>
              <div className="d-flex justify-content-center mb-3">
                {capturedImage ? (
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured"
                    style={{ maxWidth: "100%", height: "auto", maxHeight: "200px" }}
                  />
                ) : (
                  <div style={{ maxWidth: "100%", height: "200px" }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "user" }}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    if (capturedImage) {
                      setCapturedImage(null)
                    } else {
                      capture()
                    }
                  }}
                  className="px-4"
                  disabled={isLoading}
                >
                  <Camera size={20} className="me-2" />
                  {isLoading ? "Processing..." : capturedImage ? "Retake" : "Capture"} Image
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Book