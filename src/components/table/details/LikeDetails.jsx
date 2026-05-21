import React from "react";
import Stat from "../Stat";
import Rankings from "../Rankings";

export default function LikeDetails({ row }) {
	const id = row.id;

	return (
		<div className="detail-sections">
			<div>
				<div className="detail-section__title">Summary</div>
				<Stat
					label="Total likes"
					value={row.score || 0}
					tooltip="How many times this button has been liked. Each user can like only once."
					tooltipId={`${id}-total-likes`}
				/>
			</div>
			<Rankings row={row} />
		</div>
	);
}
