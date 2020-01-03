import React from "react";
import AddProject from "../AddProject";
import FilterList from "../FilterList";
import ProjectActions from "../ProjectActions";

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

  return (
    <>
      <div className="app-navbar">
        <FilterList />

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
                <ProjectActions
                  projects={projects}
                  setProjects={setProjects}
                  projectId={project._id}
                />
              </header>
            );
          })}
        </div>
      </div>
    </>
  );
}
