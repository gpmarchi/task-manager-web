import React, { useState } from "react";
import api from "../../services/api";

import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div className="login-content">
      <img src={logo} alt="task manager" />
      {error && <span className="error">{error}</span>}
      <form onSubmit={handleSubmit}>
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
        />
        <button type="submit" className="btn">
          Log in
        </button>
      </form>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        Forgot your password?
      </a>
      <span>
        If you don't have an account sign up <a href="/signup">here</a>
      </span>
      <div className="icon-credit">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/freepik"
          target="_blank"
          rel="noopener noreferrer"
          title="Freepik"
        >
          Freepik
        </a>{" "}
        and{" "}
        <a
          href="https://www.flaticon.com/authors/those-icons"
          target="_blank"
          rel="noopener noreferrer"
          title="Those Icons"
        >
          Those Icons
        </a>{" "}
        from{" "}
        <a
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}
