import React from "react";
import humanizeString from "humanize-string";
import { Link } from "react-router-dom";

export default function Header({ namespace, currentType, icons }) {
  const renderTypeMenu = () => {
    return (
      <div className="type-menu">
        <Link to="/dashboard/like" className="type-menu__link">
          {icons["like"]}
          Like Buttons
        </Link>
        <span>|</span>
        <Link to="/dashboard/updown" className="type-menu__link">
          {icons["updown"]}
          Like/Dislike Buttons
        </Link>
        <span>|</span>
        <Link to="/dashboard/clap" className="type-menu__link">
          {icons["clap"]}
          Clap Buttons
        </Link>
      </div>
    );
  };

  return (
    <>
      <h2 className="pane__title">
        {namespace
          ? humanizeString(`${namespace} ${currentType} buttons`)
          : `All ${currentType} buttons`}
      </h2>
      {renderTypeMenu()}
    </>
  );
}
