import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import api from "../../services/api";

import addButton from "../../assets/add-button.svg";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddProject({ projects, setProjects }) {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = async () => {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/projects",
      { name: projectName },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setProjects([...projects, response.data]);
    setShowModal(false);
  };

  return (
    <>
      <img src={addButton} alt="add project" onClick={handleShowModal} />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label htmlFor="name">Project Name</label>
            <input
              id="name"
              type="text"
              onChange={event => {
                setProjectName(event.target.value);
              }}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
