import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import store from "../Redux/store";
import { logIn } from "../Redux/actionTypes";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../Utils/api";

const SignUpForm = (props) => {
  const [isRep, setIsRep] = useState(false);
  const [isSignUpErr, setIsSignUpErr] = useState(false);

  const initialValues = {
    is_representative: false,
    representative_id: "",
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    zip_code: "",
  };
  const validationSchema = Yup.object({
    is_representative: Yup.boolean().nullable(),
    representative_id: Yup.string().when("user_role", {
      is: true,
      then: Yup.string()
        .min(6, "*Representative ID must be 6 characters long")
        .max(6, "*Representative ID must be 6 characters long")
        .required(),
    }),
    first_name: Yup.string()
      .max(99, "*First name must be less than 100 characters")
      .required("*First name is required"),
    last_name: Yup.string()
      .max(99, "*Last name must be less than 100 characters")
      .required("*Last name is required"),
    user_name: Yup.string()
      .min(3, "*Username must be greater than 2 characters")
      .max(24, "*Username must be less than 25 characters")
      .required("*Username is required"),
    password: Yup.string()
      .min(3, "*Password must be greater than 2 characters")
      .max(24, "*Password must be less than 25 characters")
      .required("*Password is required"),
    zip_code: Yup.string()
      .min(5, "*Zipcode must be 5 characters long")
      .max(5, "*Zipcode must be 5 characters long")
      .required("*Zipcode is required"),
  });

  const handleSignUp = async (values, { resetForm }) => {
    setIsRep(false);
    resetForm(initialValues);

    await API.post("/signup", values)
      .then(({ data, status }) => {
        if (status === 200) {
          store.dispatch(logIn(data));
          setIsSignUpErr(false);
          return true;
        } else {
          setIsSignUpErr(true);
          return false;
        }
      })
      .catch((e) => {
        setIsSignUpErr(true);
        return false;
      });
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
          <Modal.Body>
            {isSignUpErr ? (
              <div className="error-message">
                Error creating account, please try again.
              </div>
            ) : null}
          </Modal.Body>
          .
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              const successfulSignUp = await handleSignUp(values, actions);
              if (successfulSignUp) {
                props.onHide();
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">I am a...</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      setIsRep(e.target.value);
                      setFieldValue("is_representative", e.target.value);
                      setFieldTouched("is_representative", true, true);
                    }}
                    name="is_representative"
                    onBlur={() => {
                      handleBlur({ target: { name: "is_representative" } });
                    }}
                    value={values.is_representative}
                  >
                    <option value={false}>Citizen</option>
                    <option value={true}>State Representative</option>
                  </Form.Select>
                </Form.Group>

                {isRep ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Representative ID</Form.Label>
                    <Form.Control
                      className="error"
                      name="representative_id"
                      placeholder="Representative ID"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.representative_id}
                      isValid={
                        touched.representative_id && !errors.representative_id
                      }
                    />
                    {touched.representative_id && errors.representative_id ? (
                      <div className="error-message">
                        {errors.representative_id}
                      </div>
                    ) : null}
                  </Form.Group>
                ) : null}

                <div className="flex flex-row flex-wrap items-center justify-content">
                  <Form.Group className="mb-3 w-1/2 pr-2">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="first_name"
                      placeholder="First name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.first_name}
                      isValid={touched.first_name && !errors.first_name}
                    />
                    {touched.first_name && errors.first_name ? (
                      <div className="error-message">{errors.first_name}</div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3 w-1/2 pl-2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="last_name"
                      placeholder="Last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                      isValid={touched.last_name && !errors.last_name}
                    />
                    {touched.last_name && errors.last_name ? (
                      <div className="error-message">{errors.last_name}</div>
                    ) : null}
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="user_name"
                    type="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user_name}
                    isValid={touched.user_name && !errors.user_name}
                  />
                  {touched.user_name && errors.user_name ? (
                    <div className="error-message">{errors.user_name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isValid={touched.password && !errors.password}
                  />
                  {touched.password && errors.password ? (
                    <div className="error-message">{errors.password}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    name="zip_code"
                    placeholder="123456"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zip_code}
                    isValid={touched.zip_code && !errors.zip_code}
                  />
                  {touched.zip_code && errors.zip_code ? (
                    <div className="error-message">{errors.zip_code}</div>
                  ) : null}
                </Form.Group>

                <div className="text-center">
                  <Button className="ml-1" type="submit">
                    Signup
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignUpForm;
