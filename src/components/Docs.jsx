import React, { useState, useEffect } from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
// import { fetchDocs } from "../api";
import SwaggerUI from "swagger-ui-react";

export default function Docs() {
  useAsyncEffect(() => {
    // await fetchDocs();
  }, []);

  return (
    <div className="Page">
      <section className="section">
        <div className="section__container">
          <p className="section__title">Documentation</p>
          <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
        </div>
      </section>
    </div>
  );
}
