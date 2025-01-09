import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

const DashboardLayout = ({ children }) => {
  const [email, setEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const ae = localStorage.getItem("a_email");
    setEmail(ae || '');
  }, []);

  const logout = () => {
    localStorage.removeItem("a_email");
    localStorage.removeItem("token");
  };

  const navItems = [
    { name: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { name: 'Profile', icon: '👤', path: '/pprof' },
    { name: 'Add/Edit Parking', icon: '➕', path: '/parking' },
    { name: 'Fill Slots', icon: '🅿️', path: '/bookslot' },
    { name: 'Free Slots', icon: '🆓', path: '/freeslot' },
    { name: 'View Parking', icon: '👁️', path: '/sclient' },
  ];

  return (
    <Container fluid className="p-0">
      <Row className="flex-xl-nowrap">
        <Col as="nav" xs={12} md={3} lg={2} className="sidebar" style={{ backgroundColor: '#1a237e', minHeight: '100vh', padding: 0 }}>
          <Navbar expand="md" className="flex-md-column flex-row align-items-start py-2" style={{ height: '100%', width: '100%' }}>
            <Navbar.Brand className="mr-0 mb-4 text-white" style={{ fontSize: '2rem', padding: '0 15px' }}>PDASH</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" style={{ width: '100%' }}>
              <Nav className="flex-md-column flex-row w-100 justify-content-between">
                {navItems.map((item) => (
                  <Nav.Item key={item.name} className="w-100 mb-3">
                    <Nav.Link
                      as={Link}
                      to={item.path}
                      active={location.pathname === item.path}
                      className="d-flex align-items-center text-white"
                      style={{ fontSize: '1.2rem', padding: '10px 15px' }}
                    >
                      {item.icon} <span style={{ marginLeft: '10px' }}>{item.name}</span>
                    </Nav.Link>
                  </Nav.Item>
                ))}
                <Nav.Item className="w-100 mb-3">
                  <Nav.Link as={Link} to="/" onClick={logout} className="text-white" style={{ fontSize: '1.2rem', padding: '10px 15px' }}>
                    🚪 Logout
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col xs={12} md={9} lg={10} className="px-4" style={{ backgroundColor: '#e8eaf6' }}>
          <Navbar bg="white" className="border-bottom mb-4">
            <Navbar.Text className="ml-auto" style={{ fontSize: '1.2rem', color: '#1a237e' }}>
              Welcome, {email}
            </Navbar.Text>
          </Navbar>
          <main>
            {children}
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;