import React from "react";

export function Panes({ children }) {
  return <div className="panes">{children}</div>;
}

export function Menu({ children }) {
  return <div className="pane__left">{children}</div>;
}

export function Pane({ children }) {
  return <div className="pane">{children}</div>;
}
