import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ReactComponent as Info } from "assets/icons/outline/information-circle.svg";
import "react-tooltip/dist/react-tooltip.css";

export default function Tooltip({ message, id, children }) {
	return (
		<>
			<span id={id} className="tooltip__icon">
				{children || (
					<span className="tooltip__link">
						<Info />
					</span>
				)}
			</span>
			<ReactTooltip
				anchorId={id}
				place="top"
				effect="float"
				multiline={true}
				textColor="#ffffff"
				content={message}
				className="tooltip"
			/>
		</>
	);
}
