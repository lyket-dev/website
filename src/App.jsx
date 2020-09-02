import React from "react";
import { hot } from "react-hot-loader";
import useAsyncEffect from "./utils/useAsyncEffect";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import { PrivateRoute, PublicRoute } from "./components/sub/Routes";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Privacy from "./components/Privacy";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Docs from "./components/Docs";
import UserSettings from "./components/UserSettings";
import "./styles/main.sass";

window.Buffer = window.Buffer || require("buffer").Buffer;

const App = () => {
  const loggedIn = sessionStorage.getItem("token");

  useAsyncEffect(() => {
    if (loggedIn) {
      console.log("ueee");
    }
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/">
          <Home />
        </PublicRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/signup">
          <Signup />
        </PublicRoute>
        <PublicRoute path="/docs">
          <Docs />
        </PublicRoute>
        <PublicRoute path="/demos">
          <Login />
        </PublicRoute>
        <PublicRoute path="/privacy">
          <Privacy />
        </PublicRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/logout">
          <Logout />
        </PrivateRoute>
        <PrivateRoute path="/user-settings">
          <UserSettings />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default hot(module)(App);
