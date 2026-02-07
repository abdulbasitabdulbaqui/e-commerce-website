import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbarr = () => {
  const [isLogin, setIsLogin] = useState();

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
    setIsLogin(true)
  };

  const handleLogout = () => {
    navigate("/")
    setIsLogin(false)
  }
  return (
    <div>
      <Navbar className="mt-3" bg="success" data-bs-theme="dark">
        <Container className="gap-5">
          <Navbar.Brand href="/">E-commerce</Navbar.Brand>
          <Nav className="me-auto gap-5">
            <NavLink to="/" className="nav-link text-white">
              Home
            </NavLink>
            <NavLink to="/products" className="nav-link text-white">
              products
            </NavLink>
            <NavLink to="/contact" className="nav-link text-white">
              Contact
            </NavLink>
          </Nav>
          {isLogin ? (
            <>
              <Button onClick={handleLogout} className="pe-3" variant="light">
                logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogin} className="pe-3" variant="light">
                Login
              </Button>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarr;
