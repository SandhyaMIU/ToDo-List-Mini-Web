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
import { useLocation, useNavigate } from "react-router-dom";
import $axios from "../../lib/$axios";

const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "PENDING");
  const [priority, setPriority] = useState(task?.priority || "LOW");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUpdateTask = async (e) => {
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
      await $axios.put(`tasks/edit/${task?.id}`, {
        title,
        description,
        status,
        priority,
      });
      setTaskUpdated(true);
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
          <h2 className="text-center mb-4"><strong>Edit Task</strong></h2>

          {taskUpdated && (
            <Alert variant="success">Task updated successfully!</Alert>
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form noValidate onSubmit={handleUpdateTask} style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
            <Form.Group controlId="formBasicTitle" className="mb-3">
              <Form.Label><strong>Task Title</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                isInvalid={!!errors.title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mb-3">
              <Form.Label><strong>Task Description</strong></Form.Label>
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
              <Form.Label><strong>Task Status</strong></Form.Label>
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
              <Form.Label><strong>Task Priority</strong></Form.Label>
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
                  Updating Task...
                </>
              ) : (
                "Update Task"
              )}
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTask;
