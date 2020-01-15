import React, { useState, useEffect, createContext } from "react";
import api from "../services/api";

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
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
      }
    }
    loadProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={[projects, setProjects]}>
      {props.children}
    </ProjectsContext.Provider>
  );
};
