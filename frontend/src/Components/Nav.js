import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import LoginButton from "./Login";

const NavBar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">PetitNearYou</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#home" className="text-purple-50">
              Home
            </Nav.Link>
            <Nav.Link href="#explore">Explore</Nav.Link>
            {props.authenticated ? (
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            ) : null}
          </Nav>
          <SearchBar />
          {props.authenticated ? (
            <Nav>
              <NavDropdown
                title={
                  <span>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                }
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item>Settings</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <LoginButton />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    authenticated: user.authenticated,
  };
};

export default connect(mapStateToProps)(NavBar);
