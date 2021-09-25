import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../Utils/api";

const SignUpForm = (props) => {
  const [isRep, setIsRep] = useState(false);

  const initialValues = {
    userRole: "",
    representativeId: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    zipcode: 0,
  };
  const validationSchema = Yup.object({
    userRole: Yup.string().nullable(),
    representativeId: Yup.string().when("userRole", {
      is: "1",
      then: Yup.string()
        .min(6, "*Representative ID must be 6 characters long")
        .max(6, "*Representative ID must be 6 characters long")
        .required(),
    }),
    firstName: Yup.string()
      .max(99, "*First name must be less than 100 characters")
      .required("*First name is required"),
    lastName: Yup.string()
      .max(99, "*Last name must be less than 100 characters")
      .required("*Last name is required"),
    username: Yup.string()
      .min(3, "*Username must be greater than 2 characters")
      .max(24, "*Username must be less than 25 characters")
      .required("*Username is required"),
    password: Yup.string()
      .min(3, "*Password must be greater than 2 characters")
      .max(24, "*Password must be less than 25 characters")
      .required("*Password is required"),
    zipcode: Yup.string()
      .min(5, "*Zipcode must be 5 characters long")
      .max(5, "*Zipcode must be 5 characters long")
      .required("*Zipcode is required"),
  });

  const handleSignUp = async (values, { resetForm }) => {
    const res = await API.post("/signup", values);
    console.log(res);
    resetForm(initialValues);
  };

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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldTouched,
            }) => (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">I am a...</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      handleOnSelectChange(e.target.value);
                      setFieldValue("userRole", e.target.value);
                      setFieldTouched("userRole", true, true);
                    }}
                    name="userRole"
                    onBlur={() => {
                      handleBlur({ target: { name: "userRole" } });
                    }}
                    value={values.userRole}
                  >
                    <option value="0">Citizen</option>
                    <option value="1">State Representative</option>
                  </Form.Select>
                </Form.Group>

                {isRep ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Representative ID</Form.Label>
                    <Form.Control
                      className="error"
                      name="representativeId"
                      placeholder="Representative ID"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.representativeId}
                      isValid={
                        touched.representativeId && !errors.representativeId
                      }
                    />
                    {touched.representativeId && errors.representativeId ? (
                      <div className="error-message">
                        {errors.representativeId}
                      </div>
                    ) : null}
                  </Form.Group>
                ) : null}

                <div className="flex flex-row flex-wrap items-center justify-content">
                  <Form.Group className="mb-3 w-1/2 pr-2">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      placeholder="First name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      isValid={touched.firstName && !errors.firstName}
                    />
                    {touched.firstName && errors.firstName ? (
                      <div className="error-message">{errors.firstName}</div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3 w-1/2 pl-2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      placeholder="Last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      isValid={touched.lastName && !errors.lastName}
                    />
                    {touched.lastName && errors.lastName ? (
                      <div className="error-message">{errors.lastName}</div>
                    ) : null}
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    type="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isValid={touched.username && !errors.username}
                  />
                  {touched.username && errors.username ? (
                    <div className="error-message">{errors.username}</div>
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
                    name="zipcode"
                    placeholder="123456"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zipcode}
                    isValid={touched.zipcode && !errors.zipcode}
                  />
                  {touched.zipcode && errors.zipcode ? (
                    <div className="error-message">{errors.zipcode}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="text-center">
                  <Button className="ml-1" type="submit">
                    Signup
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignUpForm;
