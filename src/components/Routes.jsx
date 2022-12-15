import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function PrivateRoute() {
	const session = useSelector((state) => state.session);

	return (
		<>
			<Navbar loggedIn={!!session} />
			{session ? <Outlet /> : <Navigate to="/login" />}
		</>
	);
}

export function PublicRoute() {
	return (
		<>
			<Navbar loggedIn={false} />
			<Outlet />
			<Footer />
		</>
	);
}
