// src/pages/404.jsx
import React from "react";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center">404 - Page Not Found</h1>
      <p className="text-center">
        The page you are looking for does not exist.
      </p>
    </Container>
  );
};

export default NotFound;
