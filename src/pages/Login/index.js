import React, { useState } from "react";
import api from "../../services/api";

import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="content">
      <img src={logo} alt="task manager" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        Forgot your password?
      </a>
    </div>
  );
}
