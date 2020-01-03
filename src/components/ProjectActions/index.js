import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import api from "../../services/api";

import "./styles.css";

export default function ProjectActions({ projects, setProjects, projectId }) {
  async function handleContextDelete(projectId) {
    const token = localStorage.getItem("token");

    try {
      const response = await api.delete(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const deletedProject = response.data;
      const updatedProjects = projects.filter(
        project => project._id !== deletedProject._id
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <DropdownButton drop="down" title="">
      <DropdownItem
        as="button"
        onClick={() => {
          alert("pending implementation");
        }}
      >
        Add child project
      </DropdownItem>
      <Dropdown.Divider />
      <DropdownItem
        as="button"
        onClick={() => {
          alert("pending implementation");
        }}
      >
        Edit project
      </DropdownItem>
      <Dropdown.Divider />
      <DropdownItem as="button" onClick={() => handleContextDelete(projectId)}>
        Delete project
      </DropdownItem>
    </DropdownButton>
  );
}
