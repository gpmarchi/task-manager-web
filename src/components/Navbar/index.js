import React, { useContext } from "react";
import { ProjectsContext } from "../../context/ProjectsContext";
import AddProject from "../AddProject";
import FilterList from "../FilterList";
import CollapsibleList from "../CollapsibleList";
import ProjectActions from "../ProjectActions";

import "./styles.css";

export default function Navbar({ setSelectedProject }) {
  const [projects, setProjects] = useContext(ProjectsContext);
  return (
    <>
      <div className="app-navbar">
        <FilterList />
        <CollapsibleList
          listName={"Projects"}
          listItems={projects}
          addNewItem={<AddProject />}
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
