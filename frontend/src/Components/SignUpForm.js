import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const SignUpForm = (props) => {
  const [isRep, setIsRep] = useState(false);

  const handleOnSelectChange = (value) => {
    console.log(value);
    if (value === "1") setIsRep(true);
    else setIsRep(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">I am a...</Form.Label>
              <Form.Select
                onChange={(e) => handleOnSelectChange(e.target.value)}
              >
                <option value="0">Citizen</option>
                <option value="1">State Representative</option>
              </Form.Select>
            </Form.Group>

            {isRep ? (
              <Form.Group className="mb-3">
                <Form.Label>Representative ID</Form.Label>
                <Form.Control placeholder="Representative ID" />
              </Form.Group>
            ) : null}

            <div className="flex flex-row flex-wrap items-center justify-content">
              <Form.Group className="mb-3 w-1/2 pr-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="First name" />
              </Form.Group>

              <Form.Group className="mb-3 w-1/2 pl-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last name" />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control placeholder="123456" />
            </Form.Group>

            <Form.Group className="text-center">
              <Button className="ml-1">Signup</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignUpForm;
