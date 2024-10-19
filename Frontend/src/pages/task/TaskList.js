import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useLoaderData } from "react-router-dom";
import $axios from "../../lib/$axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const userId = useLoaderData();

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await $axios.get(`tasks/list/${userId}`);
        setTasks(response.data);
      } catch (error) {
        setAlert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskList();
  }, [userId]);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };

  const confirmDeleteTask = async () => {
    try {
      //await $axios.delete(`tasks/delete/${taskToDelete.id}`);
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    } catch (error) {
      setAlert(error.message);
    } finally {
      setShowModal(false);
      setTaskToDelete(null);
    }
  };

  const navigateToDetailPage = (task) => {
    navigate(`/tasks/${task.id}`, { state: { task } });
  };

  const navigateToEditPage = (task) => {
    navigate(`/tasks/${task.id}/edit`, { state: { task } });
  };

  const navigateToCreatePage = () => {
    navigate(`/tasks/add`);
  };

  const handleLogoutClicked = () => {
    localStorage.removeItem("USER_ID");
    navigate("/");
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={10}>
          <h2 className="text-center mb-4">Task List</h2>

          {alert && <Alert variant="danger">{alert}</Alert>}

          <div className="mb-3 text-end">
            <Button
              variant="primary"
              className="me-2"
              onClick={navigateToCreatePage}
            >
              Create New Task
            </Button>
            <Button variant="primary" onClick={handleLogoutClicked}>
              Logout
            </Button>
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <span className="ms-2">Loading tasks...</span>
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <tr key={task.id}>
                      <td>{index + 1}</td>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td>{task.priority}</td>
                      <td>
                        <Button
                          variant="info"
                          className="me-2"
                          onClick={() => navigateToDetailPage(task)}
                        >
                          Detail
                        </Button>

                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => navigateToEditPage(task)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => handleDeleteClick(task)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No tasks available.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task "{taskToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskList;