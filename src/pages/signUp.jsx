import React, { useState } from "react";
import "./signUpStyles.css";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Added state for alert
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    const form = document.querySelector(".signup-form");
    if (form.checkValidity() === false) {
      setValidated(true);
      return false;
    }
    setValidated(true);
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (handleValidation()) {
      setLoading(true);

      // Simulate API call or other asynchronous operation
      setTimeout(() => {
        setLoading(false);
        setIsRegistered(true);
        setShowAlert(true); // Show the alert on successful registration
      }, 2000);
    }
  };
  const handleBack = () => {
    navigate("/signIn"); // Go back to the previous page
  };

  return (
    <div className="signUpPage">
      <Navbar />
      <div className="signUp-div">
        <div className="signup-container">
          <Form
            className="signup-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            <Form.Group controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="validationCustomPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                maxLength={6}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password must be 6 characters long.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>

            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Form>
          {validated && isRegistered && (
            <Alert
              variant="success"
              className="success-message"
              onClose={() => navigate("/")}
              dismissible>
              <Alert.Heading>Congratulations!</Alert.Heading>
              <p>
                You have successfully registered to our website. Have a nice
                day!.
              </p>
            </Alert>
          )}
        </div>
        <div className="goBack" onClick={handleBack}>
          <p>Back</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
