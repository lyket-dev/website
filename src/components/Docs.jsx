import React, { useState } from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
import SwaggerUI from "swagger-ui-react";
import ReactMarkdown from "react-markdown";
import "swagger-ui-react/swagger-ui.css";

export default function Docs() {
  const [markdown, setMarkdown] = useState(null);

  useAsyncEffect(() => {
    fetch("https://raw.githubusercontent.com/lyket-dev/react/master/README.md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="Page">
      <section className="section--left">
        <div className="section__container">
          <p className="section__title">React component Documentation</p>
          <ReactMarkdown source={markdown} />
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <p className="section__title">API Documentation</p>
          <SwaggerUI url={`${process.env.REACT_APP_API_DOMAIN}/schema`} />
        </div>
      </section>
    </div>
  );
}
