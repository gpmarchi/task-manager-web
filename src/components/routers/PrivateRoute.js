import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...otherProps }) {
  function isAuthenticated() {
    const token = localStorage.getItem("token");
    return token ? true : false;
  }

  return (
    <Route
      {...otherProps}
      component={props =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
