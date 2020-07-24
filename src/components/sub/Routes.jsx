import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";

export function PrivateRoute({ children, ...rest }) {
  const loggedIn = sessionStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          <>
            <Navbar loggedIn />
            {children}
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function PublicRoute({ children, ...rest }) {
  return (
    <Route {...rest}>
      <Navbar />
      {children}
    </Route>
  );
}
