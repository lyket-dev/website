import React, { useState } from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
import SwaggerUI from "swagger-ui-react";
import ReactMarkdown from "react-markdown";
import "swagger-ui-react/swagger-ui.css";

export default function Docs() {
  const [markdown, markdownSet] = useState(null);
  const [showApi, showApiSet] = useState(false);

  useAsyncEffect(() => {
    fetch("https://raw.githubusercontent.com/lyket-dev/react/master/README.md")
      .then((response) => response.text())
      .then((text) => markdownSet(text));
  }, []);

  return (
    <div className="page">
      <div className="page__menu">
        <button className="navbar__link" onClick={() => showApiSet(false)}>
          Component
        </button>
        <span>|</span>
        <button className="navbar__link" onClick={() => showApiSet(true)}>
          API
        </button>
      </div>
      <div className="page__container">
        {showApi ? (
          <section className="docs">
            <p className="docs__title">API docs</p>
            <SwaggerUI url={`${process.env.REACT_APP_API_DOMAIN}/schema`} />
          </section>
        ) : (
          <section className="docs">
            <p className="docs__title">React component docs</p>
            <ReactMarkdown source={markdown} className="docs__markdown" />
          </section>
        )}
      </div>
    </div>
  );
}
