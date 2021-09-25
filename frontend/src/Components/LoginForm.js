import { Button, Modal, Form } from "react-bootstrap";

const LoginForm = (props) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Please Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group>
              <Button className="mr-1">Login</Button>
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
