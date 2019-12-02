import React, { useState, useEffect } from "react";
import Toolbar from "../../components/Toolbar";
import api from "../../services/api";

import "./styles.css";

export default function Dashboard({ history }) {
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="dashboard-container">
      <div className="toolbar-content">
        <Toolbar />
      </div>
      <div className="dashboard-content">
        <div className="projects-navbar">
          {projects.map(project => {
            return <h1 key={project._id}>{project.name}</h1>;
          })}
        </div>
        <div className="tasks-content">some tasks here</div>
      </div>
    </div>
  );
}
