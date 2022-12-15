import React from "react";
import { hot } from "react-hot-loader";
import {
	BrowserRouter as Router,
	Routes,
	Navigate,
	Route,
} from "react-router-dom";
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
import { ReactNotifications } from "react-notifications-component";

window.Buffer = window.Buffer || require("buffer").Buffer;

const App = () => {
	const dispatch = useDispatch();

	useAsyncEffect(async () => {
		try {
			await dispatch(fetchCurrentSession());
		} catch (error) {
			console.log(error);
			if (error?.errors && error.errors[0].code === "DEACTIVATED_ACCOUNT") {
				console.log(error);
			} else {
				throw error;
			}
		}
	}, []);

	return (
		<>
			<ReactNotifications />
			<Router>
				<Routes>
					<Route exact path="/" element={<PublicRoute />}>
						<Route exact path="/" element={<Signup />} />
					</Route>
					<Route path="/login" element={<PublicRoute />}>
						<Route path="/login" element={<Login />} />
					</Route>
					<Route path="/signup" element={<PublicRoute />}>
						<Route path="/signup" element={<Signup />} />
					</Route>
					<Route path="/magic-link" element={<PublicRoute />}>
						<Route path="/magic-link" element={<MagicLink />} />
					</Route>
					<Route path="/privacy" element={<PublicRoute />}>
						<Route path="/privacy" element={<Privacy />} />
					</Route>
					<Route exact path="/user-settings" element={<PrivateRoute />}>
						<Route exact path="/user-settings" element={<UserSettings />} />
					</Route>
					<Route exact path="/dashboard" element={<PrivateRoute />}>
						<Route
							path="/dashboard"
							element={<Navigate from="/dashboard" to="/dashboard/like" />}
						/>
					</Route>
					<Route path="/dashboard/:type/:namespace" element={<PrivateRoute />}>
						<Route path="/dashboard/:type/:namespace" element={<Dashboard />} />
					</Route>
					<Route path="/dashboard/:type" element={<PrivateRoute />}>
						<Route path="/dashboard/:type" element={<Dashboard />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
};

export default hot(module)(App);
