import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    // <div className="d-flex h-100 w-100 justify-content-center align-items-center">
    //   <div className="bg-primary h-75 w-75 rounded-3"></div>
    // </div>
    <div
      id="login-main-container"
      className="container-fluid d-flex justify-content-center align-items-center m-0 p-0 h-100 w-100"
    >
      <div className="row w-100 h-100">
        <div
          id="login-form-container"
          className="d-flex justify-content-center align-items-center"
        >
          <Form className="w-50" onSubmit={onSubmitClick}>
            <h2 className="mb-5 text-center">Log in</h2>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <br></br>
            <br></br>
            <Form.Label
              className="w-100 text-center"
              style={{ fontSize: "14px" }}
            >
              Dont have an account?&nbsp;
              <Link to="/signup">Register</Link>
            </Form.Label>
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="primary" type="submit" className="mt-1 w-75">
                Log in
              </Button>
            </div>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
