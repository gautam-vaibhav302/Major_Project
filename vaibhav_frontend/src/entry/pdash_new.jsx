import React from "react";
import { Card, Row, Col } from 'react-bootstrap';
import DashboardLayout from "../owner_dasboard/dasboardLayout";

function PdashNew() {
  return (
    <DashboardLayout>
      <Card className="mb-4" style={{ background: 'linear-gradient(135deg, #1a237e, #3949ab)', color: 'white' }}>
        <Card.Body>
          <Card.Title as="h2" style={{ fontSize: '2.5rem' }}>Welcome to Your Parking Dashboard</Card.Title>
          <Card.Text style={{ fontSize: '1.2rem' }}>
            Manage your parking lots, view status, and control your business all in one place.
          </Card.Text>
        </Card.Body>
      </Card>
      <Row>
        <Col md={4} className="mb-4">
          <Card style={{ background: 'linear-gradient(135deg, #1e88e5, #64b5f6)', color: 'white' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.5rem' }}>Manage Parking Lots</Card.Title>
              <Card.Text style={{ fontSize: '1.1rem' }}>Add, edit, and organize your parking facilities with ease.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card style={{ background: 'linear-gradient(135deg, #43a047, #81c784)', color: 'white' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.5rem' }}>Real-time Slot Management</Card.Title>
              <Card.Text style={{ fontSize: '1.1rem' }}>Fill and free parking slots in real-time to maximize efficiency.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card style={{ background: 'linear-gradient(135deg, #00acc1, #4dd0e1)', color: 'white' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.5rem' }}>Comprehensive Overview</Card.Title>
              <Card.Text style={{ fontSize: '1.1rem' }}>Get a bird's eye view of all your parking operations at a glance.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default PdashNew;