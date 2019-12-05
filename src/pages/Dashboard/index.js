import React from "react";
import Toolbar from "../../components/Toolbar";
import Navbar from "../../components/Navbar";

import "./styles.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="toolbar-content">
        <Toolbar />
      </div>
      <div className="dashboard-content">
        <div className="navbar-content">
          <Navbar />
        </div>
        <div className="tasks-content">some tasks here</div>
      </div>
    </div>
  );
}
