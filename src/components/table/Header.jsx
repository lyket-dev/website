import React from "react";
import humanizeString from "humanize-string";

export default function Header({
  namespace,
  currentType,
  onChangeType,
  icons,
}) {
  const renderTypeMenu = () => {
    return (
      <div className="type-menu">
        <a onClick={onChangeType("like")} href="/#" className="type-menu__link">
          {icons["like"]}
          Like Buttons
        </a>
        <span>|</span>
        <a
          onClick={onChangeType("updown")}
          href="/#"
          className="type-menu__link"
        >
          {icons["updown"]}
          Like/Dislike Buttons
        </a>
        <span>|</span>
        <a onClick={onChangeType("clap")} href="/#" className="type-menu__link">
          {icons["clap"]}
          Clap Buttons
        </a>
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
