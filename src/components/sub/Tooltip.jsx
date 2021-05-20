import React from "react";
import ReactTooltip from "react-tooltip";
import { ReactComponent as Info } from "assets/icons/outline/information-circle.svg";

export default function Tooltip({ message, id }) {
  return (
    <>
      <span data-tip="React-tooltip" data-for={id} className="tooltip__link">
        <Info />
      </span>
      <ReactTooltip
        id={id}
        place="top"
        effect="float"
        multiline={true}
        backgroundColor="#1f1630"
      >
        <span className="tooltip">{message}</span>
      </ReactTooltip>
    </>
  );
}
