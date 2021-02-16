import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Bshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>
                <LinkContainer to="/cart">
                  <div>
                    <i className="fas fa-shopping-cart"></i>
                    Cart
                  </div>
                </LinkContainer>
              </Nav.Link>
              <Nav.Link>
                <LinkContainer to="/login">
                  <div>
                    <i className="fas fa-user"></i> Sign In
                  </div>
                </LinkContainer>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
