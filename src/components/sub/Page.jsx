import React from "react";

export function Page({ children }) {
  return <div className="page">{children}</div>;
}

export function Section({ children }) {
  return <section className="page__section">{children}</section>;
}
