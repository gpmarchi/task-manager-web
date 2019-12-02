import React from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";
import logo from "../../assets/calendar.svg";
import logout from "../../assets/logout.svg";
import logoutAll from "../../assets/exit.svg";

function Toolbar({ history }) {
  async function handleLogout() {
    const token = localStorage.getItem("token");
    try {
      await api.patch(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.removeItem("token");
      history.push("/");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      alert(error.response.data.error);
    }
  }

  async function handleLogoutAll() {
    const token = localStorage.getItem("token");
    try {
      await api.delete("/users/logoutAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem("token");
      history.push("/");
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.error);
    }
  }

  return (
    <div className="toolbar-actions">
      <div className="toolbar-logo">
        <a href="/dashboard#">
          <img src={logo} alt="app logo" />
        </a>
      </div>
      <div className="toolbar-search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="toolbar-buttons">
        <img src={logoutAll} alt="logout all" onClick={handleLogoutAll} />
        <img src={logout} alt="logout" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default withRouter(Toolbar);
