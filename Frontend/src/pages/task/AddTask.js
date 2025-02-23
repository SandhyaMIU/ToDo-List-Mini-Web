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
import { useLoaderData, useNavigate } from "react-router-dom";
import $axios from "../../lib/$axios";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [priority, setPriority] = useState("LOW");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const userId = useLoaderData();
  const navigate = useNavigate();

  const handleCreateTask = async (e) => {
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
      await $axios.post(`tasks/add/${userId}`, {
        title,
        description,
        status,
        priority,
      });
      setTaskCreated(true);
      navigate("/tasks");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!title) {
      errors.title = "Title is required.";
    }

    if (!description) {
      errors.description = "Description is required.";
    }

    return errors;
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Add Task</h2>

          {taskCreated && (
            <Alert variant="success">Task created successfully!</Alert>
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form noValidate onSubmit={handleCreateTask}>
            <Form.Group controlId="formBasicTitle" className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                isInvalid={Boolean(errors.title)}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                isInvalid={Boolean(errors.description)}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicStatus" className="mb-3">
              <Form.Label>Task Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPriority" className="mb-3">
              <Form.Label>Task Priority</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              type="submit"
              className="btn btn-primary"
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
                  Creating Task...
                </>
              ) : (
                "Save Task"
              )}
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTask;
