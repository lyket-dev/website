import React from "react";
import humanizeString from "humanize-string";
import { Link } from "react-router-dom";

export default function Header({ namespace, currentType, icons }) {
  return (
    <>
      <h2 className="pane__title">
        {namespace
          ? humanizeString(`${namespace} ${currentType} buttons`)
          : `All ${currentType} buttons`}
      </h2>
      <div className="type-menu">
        <Link
          to={`/dashboard/like${namespace ? `/${namespace}` : ""}`}
          className="type-menu__link"
        >
          {icons["like"]}
          Like Buttons
        </Link>
        <span>|</span>
        <Link
          to={`/dashboard/updown${namespace ? `/${namespace}` : ""}`}
          className="type-menu__link"
        >
          {icons["updown"]}
          Like/Dislike Buttons
        </Link>
        <span>|</span>
        <Link
          to={`/dashboard/clap${namespace ? `/${namespace}` : ""}`}
          className="type-menu__link"
        >
          {icons["clap"]}
          Clap Buttons
        </Link>
      </div>
    </>
  );
}
