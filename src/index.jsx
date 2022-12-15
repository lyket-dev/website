import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import store from "./store";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
	<ReduxProvider store={store}>
		<App />
	</ReduxProvider>,
);
