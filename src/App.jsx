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
import ReactNotification from "react-notifications-component";

window.Buffer = window.Buffer || require("buffer").Buffer;

const App = () => {
  const dispatch = useDispatch();

  useAsyncEffect(async () => {
    await dispatch(fetchCurrentSession());
  }, []);

  return (
    <div>
      <ReactNotification />
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
          <Switch>
            <PrivateRoute exact path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/:namespace">
              <Dashboard />
            </PrivateRoute>
          </Switch>

          <PrivateRoute exact path="/user-settings">
            <UserSettings />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default hot(module)(App);
