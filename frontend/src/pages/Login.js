import { useState } from "react";
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmitClick = async (e) => {
    e.preventDefault();

    setError(null);
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      console.log(json);
      window.location.href = "/dashboard"; // Redirect to Dashboard
    }

    console.log(email, password);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form className="w-50" onSubmit={onSubmitClick}>
        <h2 className="mb-4">Log in</h2>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Log in
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </Container>
  );
};

export default Login;
