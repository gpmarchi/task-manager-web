import React, { useState, useEffect } from "react";
import api from "../../services/api";

import "./styles.css";

export default function TaskList({ selectedProject }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(
          `/tasks?project=${selectedProject.projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    loadTasks();
  }, [selectedProject]);

  return (
    <div className="task-list">
      <h1>{selectedProject.projectName}</h1>
      <ul className="task-list">
        {tasks.map(task => {
          return (
            <li className="task-item" key={task._id}>
              {task.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
