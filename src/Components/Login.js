import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>Login</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showError && (
            <Alert variant="danger" className="mb-4">
              Invalid username or password.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <a href="/forgot-password">Forgot Password?</a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
