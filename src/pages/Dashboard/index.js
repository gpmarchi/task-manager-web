import React, { useState } from "react";
import Toolbar from "../../components/Toolbar";
import { ProjectsProvider } from "../../context/ProjectsContext";
import Navbar from "../../components/Navbar";
import TaskList from "../../components/TaskList";

import "./styles.css";

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState({
    id: "",
    name: "Inbox"
  });

  return (
    <div className="dashboard-container">
      <div className="toolbar-content">
        <Toolbar />
      </div>
      <div className="dashboard-content">
        <div className="navbar-content">
          <ProjectsProvider>
            <Navbar setSelectedProject={setSelectedProject} />
          </ProjectsProvider>
        </div>
        <div className="tasks-content">
          <TaskList selectedProject={selectedProject} />
        </div>
      </div>
    </div>
  );
}
