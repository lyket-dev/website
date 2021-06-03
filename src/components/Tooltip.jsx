import React from "react";
import ReactTooltip from "react-tooltip";
import { ReactComponent as Info } from "assets/icons/outline/information-circle.svg";

export default function Tooltip({ message, id, children }) {
  return (
    <>
      <span data-tip="React-tooltip" data-for={id}>
        {children || (
          <span className="tooltip__link">
            <Info />
          </span>
        )}
      </span>
      <ReactTooltip
        id={id}
        place="top"
        effect="float"
        multiline={true}
        backgroundColor="#1f1630"
        textColor="#ffffff"
      >
        <span className="tooltip">{message}</span>
      </ReactTooltip>
    </>
  );
}
