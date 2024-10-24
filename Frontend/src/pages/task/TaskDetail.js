import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import './../../data/TaskDetail.css';

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


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
  
    const formattedTime = `${month}-${day}-${year} ${hours}:${minutes} ${ampm}`;
    
    return formattedTime;
  };



  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4"><strong>Task Details</strong></h2>
          {task ? (
            <Card>
              <Card.Body className="card-body-custom">
                <Card.Title className="card-title-custom">
                  <strong>{task.title}</strong>
                </Card.Title>
                <Card.Text className="card-text-custom">
                  <strong>Description:</strong> {task.description || "N/A"}
                </Card.Text>
                <Card.Text className="card-text-custom">
                  <strong>Status:</strong> {task.status}
                </Card.Text>
                <Card.Text className="card-text-custom">
                  <strong>Priority:</strong> {task.priority}
                </Card.Text>
                <Card.Text className="card-text-custom">
                  <strong>Created At: </strong> {formatDate(task.createdAt)}
                </Card.Text>
                <Card.Text className="card-text-custom">
                  <strong>Updated At: </strong> {task.updatedAt ? formatDate(task.updatedAt) : "N/A"}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button className="btn btn-primary" onClick={navigateBack}>
                    Go Back
                  </Button>
                </div>
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
