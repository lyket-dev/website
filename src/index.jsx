import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import store from "./store";
import { Provider as LyketProvider } from "@lyket/react";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ReduxProvider store={store}>
    <LyketProvider
      apiKey="Xkp5R0w+6uY+OftTTVEQ2BkiwUw=" recaptchaSiteKey={`${process.env.REACT_APP_RECAPTCHA_PUBLIC}`}
      baseUrl="http://localhost:3000"
    >
      <App />
    </LyketProvider>
  </ReduxProvider>,
  rootElement
);
