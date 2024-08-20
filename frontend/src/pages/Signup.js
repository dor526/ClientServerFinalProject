import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../styles/signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onSubmitClick = async (e) => {
        e.preventDefault();

        setError(null);
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            console.log(json);
            // Handle successful signup (e.g., redirect or show a success message)
        }

        console.log(email, password);
    };

    return (
        <div id="signup-main-container" className="container-fluid d-flex justify-content-center align-items-center m-0 p-0">
            <div id="signup-form-container" className="w-100">
                <Form onSubmit={onSubmitClick} className="signup-form">
                    <h2 className="mb-4 text-center fw-bold">Sign up</h2>
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
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Sign up
                    </Button>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    <Form.Label className="d-block text-center mt-4">
                        Already have an account? <Link to="/login">Log in</Link>
                    </Form.Label>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
