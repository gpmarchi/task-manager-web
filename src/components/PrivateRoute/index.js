import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import api from "../../services/api";

import loading from "../../assets/loading.svg";
import "./styles.css";

export default function PrivateRoute({ component: Component, ...otherProps }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function isAuthenticated() {
      const token = localStorage.getItem("token");

      try {
        setLoading(true);
        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("verification", token && response.data ? true : false);
        setAuthenticated(token && response.data ? true : false);
        setLoading(false);
      } catch (error) {
        console.log("in catch", error);
        setLoading(false);
      }
    }
    isAuthenticated();
  }, []);

  return (
    <Route
      {...otherProps}
      component={props => {
        if (!authenticated && !isLoading) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        } else if (!authenticated && isLoading) {
          return (
            <div className="loading">
              <img src={loading} alt="loading" />
            </div>
          );
        } else if (authenticated) {
          return <Component {...props} />;
        }
      }}
    />
  );
}
