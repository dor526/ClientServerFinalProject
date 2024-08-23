import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for routing
import "../styles/login.css";

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
      window.location.href = "/homepage"; // Redirect to Dashboard
    }

    console.log(email, password);
  };

  return (
    <div id="login-main-container" className="container-fluid d-flex justify-content-center align-items-center m-0 p-0 h-100 w-100">
      <div id="login-form-container" className="w-100">
        <Form onSubmit={onSubmitClick} className="login-form">
          <h2 className="mt-3 mb-5 text-center fw-bold">Welcome to crypto helper</h2>
          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-center ">
            <Button variant="primary" type="submit" className="mt-3">
              Log in
            </Button>
          </div>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          <Form.Label className="d-block text-center mt-4">
            Don't have an account? <Link to="/signup">Register</Link>
          </Form.Label>
        </Form>
      </div>
    </div>
  );
};

export default Login;
