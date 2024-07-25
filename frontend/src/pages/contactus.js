import React from 'react';
//import './ContactUs.css';  // Uncomment if you have styles for this component

const ContactUs = () => {
    return (
        <div className="container">
            <div className="row">
                <ContactForm />
                <ContactInfo />
            </div>
        </div>
    );
};

const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const info = e.target.info.value;
        const predefinedSubject = e.target.predefinedSubject.value;

        if (name === '' || email === '' || info === '' || predefinedSubject === '') {
            alert('All fields are required!');
        } else {
            alert(`Thank you, ${name}. Your message has been sent!`);
        }
    };

    const handleSupportClick = () => {
        alert('Support Contact: support@example.com');
    };

    return (
        <div className="col-sm-6">
            <h2>Contact Us</h2>
            <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="info">Info <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="info" name="info" placeholder="Info" required />
                </div>
                <div className="form-group">
                    <label htmlFor="predefinedSubject">Subject <span className="text-danger">*</span></label>
                    <select className="form-control" id="predefinedSubject" name="predefinedSubject" required>
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Billing">Billing</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleSupportClick}>Contact Support</button>
            </form>
        </div>
    );
};

const ContactInfo = () => {
    return (
        <div className="col-sm-6">
            <div className="jumbotron text-center">
                <h1>Contact Us</h1>
                <p>If you have any questions, feel free to reach out to us!</p>
                <div className="d-flex justify-content-center flex-wrap">
                    <div className="p-2">
                        <h4>Email Us:</h4>
                        <p>support@example.com</p>
                    </div>
                    <div className="p-2">
                        <h4>Call Us:</h4>
                        <p>+1 234 567 890</p>
                    </div>
                </div>
                <div className="alert alert-info mt-3">
                    <h4>Special Offer!</h4>
                    <p>Get 20% off on your first purchase. Use code: FIRST20</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
