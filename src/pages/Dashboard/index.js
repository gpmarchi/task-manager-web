import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Toolbar from "../../components/Toolbar";
import Navbar from "../../components/Navbar";
import TaskList from "../../components/TaskList";

import "./styles.css";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({
    projectId: "",
    projectName: "Inbox"
  });

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
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="toolbar-content">
        <Toolbar />
      </div>
      <div className="dashboard-content">
        <div className="navbar-content">
          <Navbar
            projects={projects}
            setSelectedProject={setSelectedProject}
            setProjects={setProjects}
          />
        </div>
        <div className="tasks-content">
          <TaskList selectedProject={selectedProject} />
        </div>
      </div>
    </div>
  );
}
