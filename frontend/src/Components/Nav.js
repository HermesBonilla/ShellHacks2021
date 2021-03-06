import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import LoginButton from "./Login";

const NavBar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">UKnow</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              to="/"
              className="text-purple-50 block no-underline justify-center m-auto mx-2"
              style={{ color: "rgba(0,0,0,.55)" }}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="text-purple-50 block no-underline justify-center m-auto mx-2"
              style={{ color: "rgba(0,0,0,.55)" }}
            >
              Explore
            </Link>
            {props.authenticated ? (
              <Link
                to="/dashboard"
                className="text-purple-50 block no-underline justify-center m-auto mx-2"
                style={{ color: "rgba(0,0,0,.55)" }}
              >
                Dashboard
              </Link>
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
                <div className="ml-4">Hello, {props.first_name}</div>
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
    first_name: user.first_name,
  };
};

export default connect(mapStateToProps)(NavBar);
