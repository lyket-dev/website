import React from "react";
import Stat from "../Stat";
import Rankings from "../Rankings";

export default function ClapDetails({ row }) {
	const id = row.id;
	const avgClaps =
		row.total_votes > 0
			? parseFloat((row.score / row.total_votes).toFixed(1))
			: 0;

	return (
		<div className="detail-sections">
			<div>
				<div className="detail-section__title">Summary</div>
				<Stat
					label="Total claps"
					value={row.score || 0}
					tooltip="Total number of claps across all users. Users can clap multiple times."
					tooltipId={`${id}-total-claps`}
				/>
				<Stat
					label="Unique clappers"
					value={row.total_votes || 0}
					tooltip="Number of distinct users who clapped at least once"
					tooltipId={`${id}-unique-clappers`}
				/>
				<Stat
					label="Avg claps per user"
					value={avgClaps}
					tooltip="Average number of claps per unique user"
					tooltipId={`${id}-avg-claps`}
				/>
			</div>
			<Rankings row={row} />
		</div>
	);
}
