import React from "react";
import AddProject from "../AddProject";

import "./styles.css";

export default function Navbar({ projects, setProjects, setSelectedProject }) {
  function handleProjectClick(event, projectId, projectName) {
    const projects = document.querySelectorAll("ul li");
    for (let index = 0; index < projects.length; index++) {
      projects[index].className = "project-item";
    }
    event.target.className = "current-selected-project";
    setSelectedProject({ projectId, projectName });
  }

  function handleCollapsibleElement() {
    const collapsible = document.querySelector("div .project-actions");
    const nextSibling = collapsible.nextElementSibling;
    collapsible.classList.toggle("active");
    if (nextSibling.style.display === "block") {
      nextSibling.style.display = "none";
    } else {
      nextSibling.style.display = "block";
    }
  }

  return (
    <>
      <div className="app-navbar">
        <ul className="filters-list">
          <li>Inbox</li>
          <li>Today</li>
          <li>Next 7 days</li>
        </ul>
        <div className="project-actions">
          <button onClick={handleCollapsibleElement}>Projects</button>
          <AddProject projects={projects} setProjects={setProjects} />
        </div>
        <ul className="project-list">
          {projects.map(project => {
            return (
              <li
                className="project-item"
                key={project._id}
                onClick={event =>
                  handleProjectClick(event, project._id, project.name)
                }
              >
                {project.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
