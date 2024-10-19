import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const TaskDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const taskId = params?.taskId;
  const task = location.state?.task;

  const navigateBack = () => {
    navigate("/tasks");
  };

  if (!task || !taskId) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error fetching task details. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Task Details</h2>
          {task ? (
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {task.description || "N/A"}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong> {task.status}
                </Card.Text>
                <Card.Text>
                  <strong>Priority:</strong> {task.priority}
                </Card.Text>
                <Button variant="secondary" onClick={navigateBack}>
                  Back to Task List
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="warning">No task details available.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskDetail;
