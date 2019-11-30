import React, { useState } from "react";
import api from "../../services/api";

import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Login({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/users", { name, email, password });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data._message);
    }
  }

  return (
    <div className="signup-content">
      <img src={logo} alt="task manager" />
      {error && <span className="error">{error}</span>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={event => setName(event.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={event => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={event => setPassword(event.target.value)}
          required
          minLength="7"
        />
        <button type="submit" className="btn">
          Create my Account
        </button>
      </form>
    </div>
  );
}
