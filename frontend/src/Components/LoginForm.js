import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import store from "../Redux/store";
import { logIn } from "../Redux/actionTypes";
import API from "../Utils/api";

const LoginForm = (props) => {
  const [isLogInErr, setLogInErr] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    console.log({ user_name: username, password });
    await API.post("/login", { user_name: username, password })
      .then(({ data, status }) => {
        if (status === 200) {
          store.dispatch(logIn(data));
          setLogInErr(false);
          props.onHide();
        } else {
          setLogInErr(true);
        }
      })
      .catch((e) => {
        setLogInErr(true);
      });
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Please Login</Modal.Title>
          <Modal.Body>
            {isLogInErr ? (
              <div className="error-message">
                *Error creating account, please try again.
              </div>
            ) : null}
          </Modal.Body>
        </Modal.Header>
        <Modal.Body>
          <Form validated>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button className="mr-1" onClick={() => handleLogIn()}>
                Login
              </Button>
              <Button
                className="ml-1"
                onClick={() => {
                  props.onHide();
                  props.showSignUpForm();
                }}
              >
                Signup
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginForm;
