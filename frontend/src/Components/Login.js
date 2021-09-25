import { Button } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";

const LoginButton = () => {
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Button className="mx-2" onClick={() => setShowLogIn(true)}>
      Login
      <LoginForm
        show={showLogIn}
        onHide={() => setShowLogIn(false)}
        showSignUpForm={() => {
          setShowSignUp(true);
        }}
      />
      <SignUpForm show={showSignUp} onHide={() => setShowSignUp(false)} />
    </Button>
  );
};

export default LoginButton;
