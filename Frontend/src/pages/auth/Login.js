import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import $axios from "../../lib/$axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
      const response = await $axios.post("users/login", {
        email,
        password,
      });

      if (response.data?.status) {
        localStorage.setItem("USER_ID", response.data?.userId);
        setValidated(true);
        // replace "/" route with "/tasks", so users can't go back to login page
        navigate("/tasks", { replace: true });
      } else {
        setErrorMessage(response.data?.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

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
          <h2 className="text-center mb-4">Login</h2>

          {validated && <Alert variant="success">Login successful!</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form noValidate onSubmit={handleLogin}>
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>Don't have an account?</p>
            <Link to="/register">
              <Button variant="link" disabled={loading}>
                Register Here
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
