import React from "react";

export default function Decorator({ image, fulltext, toDecorate, color }) {
  const splitted = fulltext.split(toDecorate);

  return (
    <>
      <span className="decorator__item">{splitted[0]}</span>
      <span>
        <p className={`decorator__chosen--${color}`}>{toDecorate}</p>
      </span>
      <span className="decorator__item">{splitted[1]}</span>
    </>
  );
}
