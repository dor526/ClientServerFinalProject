import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
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
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Form onSubmit={onSubmitClick} className="w-50 mx-auto">
                <h2 className="mb-4">Sign up</h2>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Sign up
                </Button>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
        </Container>
    );
};

export default Signup;
