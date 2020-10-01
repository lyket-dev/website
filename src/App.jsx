import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components/sub/Routes";
import Dashboard from "components/Dashboard";
import Login from "components/Login";
import Privacy from "components/Privacy";
import Signup from "components/Signup";
import UserSettings from "components/UserSettings";
import MagicLink from "components/MagicLink";
import "styles/main.sass";
import { useDispatch } from "react-redux";
import useAsyncEffect from "utils/useAsyncEffect";
import { fetchCurrentSession } from "ducks/session";

window.Buffer = window.Buffer || require("buffer").Buffer;

const App = () => {
  const dispatch = useDispatch();

  useAsyncEffect(async () => {
    try {
      await dispatch(fetchCurrentSession());
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/">
          <Login />
        </PublicRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/signup">
          <Signup />
        </PublicRoute>
        <PublicRoute path="/magic-link">
          <MagicLink />
        </PublicRoute>
        <PublicRoute path="/privacy">
          <Privacy />
        </PublicRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/user-settings">
          <UserSettings />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default hot(module)(App);
