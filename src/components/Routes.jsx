import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function PrivateRoute({ children, ...rest }) {
  const session = useSelector((state) => state.session);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        session ? (
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
      <Footer />
    </Route>
  );
}
