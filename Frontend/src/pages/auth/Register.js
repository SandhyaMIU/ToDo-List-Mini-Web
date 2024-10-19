import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import $axios from "../../lib/$axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setErrorMessage(null);

    try {
      const response = await $axios.post("users/register", {
        userName: username,
        email,
        password,
      });
      if (response.data) {
        setRegistered(true);
        navigate("/");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required.";
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Register</h2>

          {registered && (
            <Alert variant="success">Registration successful!</Alert>
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form noValidate onSubmit={handleRegister}>
            <Form.Group controlId="formBasicUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                isInvalid={Boolean(errors.username)}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                isInvalid={Boolean(errors.email)}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                isInvalid={Boolean(errors.password)}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>Already have an account?</p>
            <Link to="/">
              <Button variant="link" disabled={loading}>
                Login Here
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
