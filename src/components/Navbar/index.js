import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import AddProject from "../AddProject";
import api from "../../services/api";

import "./styles.css";

export default function Navbar({ projects, setProjects, setSelectedProject }) {
  function handleProjectClick(event, projectId, projectName) {
    const projects = document.querySelectorAll("div.project-list header");
    for (let index = 0; index < projects.length; index++) {
      projects[index].className = "project-item";
    }
    event.target.parentNode.className = "project-item current-selected-project";
    setSelectedProject({ projectId, projectName });
  }

  function handleCollapsibleElement() {
    const collapsible = document.querySelector("div .projects-collapsible");
    const nextSibling = collapsible.nextElementSibling;
    collapsible.classList.toggle("active");
    if (nextSibling.style.display === "block") {
      nextSibling.style.display = "none";
    } else {
      nextSibling.style.display = "block";
    }
  }

  async function handleContextDelete(projectId) {
    const token = localStorage.getItem("token");

    try {
      const response = await api.delete(
        `/projects/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("delete", response.data);
    } catch (error) {
      console.log(error.response);
    }

    // setProjects([...projects, response.data]);
  }

  return (
    <>
      <div className="app-navbar">
        <ul className="filters-list">
          <li>Inbox</li>
          <li>Today</li>
          <li>Next 7 days</li>
        </ul>
        <header className="projects-collapsible">
          <button onClick={handleCollapsibleElement}>Projects</button>
          <AddProject projects={projects} setProjects={setProjects} />
        </header>

        <div className="project-list">
          {projects.map(project => {
            return (
              <header className="project-item" key={project._id}>
                <button
                  onClick={event =>
                    handleProjectClick(event, project._id, project.name)
                  }
                >
                  {project.name}
                </button>
                <DropdownButton drop="down" title="...">
                  <DropdownItem
                    as="button"
                    onClick={() => handleContextDelete(project._id)}
                  >
                    Delete project
                  </DropdownItem>
                </DropdownButton>
              </header>
            );
          })}
        </div>
      </div>
    </>
  );
}
