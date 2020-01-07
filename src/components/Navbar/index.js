import React from "react";
import AddProject from "../AddProject";
import FilterList from "../FilterList";
import CollapsibleList from "../CollapsibleList";
import ProjectActions from "../ProjectActions";

import "./styles.css";

export default function Navbar({ projects, setProjects, setSelectedProject }) {
  return (
    <>
      <div className="app-navbar">
        <FilterList />
        <CollapsibleList
          listName={"Projects"}
          listItems={projects}
          addNewItem={
            <AddProject projects={projects} setProjects={setProjects} />
          }
          listItemsActions={projects.map(project => (
            <ProjectActions
              projects={projects}
              setProjects={setProjects}
              projectId={project._id}
            />
          ))}
          setSelectedItem={setSelectedProject}
        />
      </div>
    </>
  );
}
