import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import Cookies from "js-cookie"; // Import Cookies for managing cookies
import { isLoggedIn } from "../components/utils";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("stock-site-token");

    // Optionally: Implement any other logout logic here

    // Redirect to the login page after logging out
    navigate("/login");
  };

  const loggedIn = isLoggedIn(); // Determine if the user is logged in

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-4">
      <Container className="mt-1 p-1">
        <BootstrapNavbar.Brand href="#">Crypto Site</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {loggedIn ? (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link as={Link} to="/contactus">
                  Contact Us
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/contactus">
                  Contact Us
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
