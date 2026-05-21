import React from "react";
import Tooltip from "components/Tooltip";

export default function Stat({ label, value, tooltip, tooltipId }) {
	return (
		<div className="detail-stat">
			<span>{label}:</span>
			{tooltip && tooltipId && <Tooltip message={tooltip} id={tooltipId} />}
			<strong>{value}</strong>
		</div>
	);
}
