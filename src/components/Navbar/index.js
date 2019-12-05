import React, { useState, useEffect } from "react";
import api from "../../services/api";

import addButton from "../../assets/add-button.svg";

import "./styles.css";

export default function Navbar({ history }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    async function loadProjects() {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/projects", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
          history.push("/");
        }
      }
    }
    loadProjects();
  }, [history]);

  function handleProjectClick(event, projectId) {
    const projects = document.querySelectorAll("ul li");
    for (let index = 0; index < projects.length; index++) {
      projects[index].className = "project-item";
    }
    event.target.className = "current-selected-project";
    setSelectedProject(projectId);
  }

  return (
    <div className="projects-navbar">
      <div className="common-task-filters">
        <ul className="filters-list">
          <li>Inbox</li>
          <li>Today</li>
          <li>Next 7 days</li>
        </ul>
      </div>
      <div className="projects">
        <div className="project-actions">
          <button>Projects</button>
          <img src={addButton} alt="add project" />
        </div>
        <ul className="main-projects">
          {projects.map(project => {
            return (
              <li
                className="project-item"
                key={project._id}
                onClick={event => handleProjectClick(event, project._id)}
              >
                {project.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
