import { Link } from "react-router-dom";
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

const Navbar = () => {
    return (
        <BootstrapNavbar bg="light" expand="lg" className="mb-4">
            <Container>
                <BootstrapNavbar.Brand href="#">Stocks Site</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;
