import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import store from "./store";
import { Provider as LaikitProvider } from "@laikit/react";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ReduxProvider store={store}>
    <LaikitProvider apiKey="Xkp5R0w+6uY+OftTTVEQ2BkiwUw=">
      <App />
    </LaikitProvider>
  </ReduxProvider>,
  rootElement
);
