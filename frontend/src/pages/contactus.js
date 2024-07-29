import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import '../styles/contactus.css';

const ContactUs = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <ContactForm />
                </Col>
                <Col md={6}>
                    <ContactInfo />
                </Col>
            </Row>
        </Container>
    );
};

const ContactForm = () => {
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const info = e.target.info.value;
        const predefinedSubject = e.target.predefinedSubject.value;

        if (name === '' || email === '' || info === '' || predefinedSubject === '') {
            alert('All fields are required!');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else {
            sendEmail(e);
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const sendEmail = (e) => {
        emailjs.sendForm('service_5rbpg5k', 'template_ufdu9pe', form.current, 'Nt-NeJLewxMEiJHyK')
            .then(
                () => {
                    alert(`Thank you, ${e.target.name.value}. Your message has been sent!`);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert('An error occurred while sending the email.');
                }
            );
    };

    const handleSupportClick = () => {
        alert('Support Contact: support@example.com');
    };

    return (
        <Form ref={form} id="contactForm" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            <Form.Group controlId="name">
                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="name" placeholder="Name" required />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" required />
            </Form.Group>
            <Form.Group controlId="info">
                <Form.Label>Info <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="info" placeholder="Info" required />
            </Form.Group>
            <Form.Group controlId="predefinedSubject">
                <Form.Label>Subject <span className="text-danger">*</span></Form.Label>
                <Form.Control as="select" name="predefinedSubject" required>
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing">Billing</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 ms-2">
                Submit
            </Button>
            <Button variant="secondary" type="button" className="mt-3 ms-2" onClick={handleSupportClick}>
                Contact Support
            </Button>
        </Form>
    );
};

const ContactInfo = () => {
    return (
        <Card className="text-center mt-4">
            <Card.Body>
                <Card.Title>Contact Us</Card.Title>
                <Card.Text>If you have any questions, feel free to reach out to us!</Card.Text>
                <div className="justify-content-center flex-wrap">
                    <div className="p-2">
                        <h4>Email Us:</h4>
                        <p>support@example.com</p>
                    </div>
                    <div className="p-2">
                        <h4>Call Us:</h4>
                        <p>+1 234 567 890</p>
                    </div>
                </div>
                <Alert variant="info" className="mt-3">
                    <h4>Special Offer!</h4>
                    <p>Get 20% off on your first purchase. Use code: FIRST20</p>
                </Alert>
            </Card.Body>
        </Card>
    );
};

export default ContactUs;
