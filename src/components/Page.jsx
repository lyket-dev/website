import React from "react";

export function Page({ children }) {
  return <div className="page">{children}</div>;
}

export function Section({ children, center }) {
  let classNames = ["section"];

  if (center) {
    classNames = [...classNames, "center"];
  }

  return <section className={classNames.join(" ")}>{children}</section>;
}
