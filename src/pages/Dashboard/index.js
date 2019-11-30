import React, { useState, useEffect } from "react";
import api from "../../services/api";

import "./styles.css";
import gear from "../../assets/gear.svg";

export default function Dashboard({ history }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log("useeffect");

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
        <div className="toolbar-actions">
          <img src={gear} alt="gear" />
        </div>
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
