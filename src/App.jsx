import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components/Routes";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import Privacy from "pages/Privacy";
import Signup from "pages/Signup";
import UserSettings from "pages/UserSettings";
import MagicLink from "pages/MagicLink";
import "styles/main.sass";
import { useDispatch } from "react-redux";
import useAsyncEffect from "utils/useAsyncEffect";
import { fetchCurrentSession } from "ducks/session";
import ReactNotification from "react-notifications-component";

window.Buffer = window.Buffer || require("buffer").Buffer;

const App = () => {
  const dispatch = useDispatch();

  useAsyncEffect(async () => {
    try {
      await dispatch(fetchCurrentSession());
    } catch (e) {
      // ingoia l'errore se non autorizzato
      console.error(e);
    }
  }, []);

  return (
    <>
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
          <PrivateRoute exact path="/user-settings">
            <UserSettings />
          </PrivateRoute>
          <Switch>
            <PrivateRoute exact path="/dashboard">
              <Redirect from="/dashboard" to="/dashboard/like" />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/:type/:namespace">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/:type">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Switch>
      </Router>
    </>
  );
};

export default hot(module)(App);
