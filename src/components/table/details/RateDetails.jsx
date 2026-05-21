import React from "react";
import Stat from "../Stat";
import Rankings from "../Rankings";
import DistributionBar from "../DistributionBar";

export default function RateDetails({ row }) {
	const id = row.id;
	const dist = row.votes_distribution;
	const total = row.total_votes || 0;
	const avg =
		row.score > 0 && total > 0
			? parseFloat((row.score / total).toFixed(2))
			: 0;
	const max = dist ? Math.max(...[1, 2, 3, 4, 5].map((s) => dist[s] || 0)) : 0;

	return (
		<div className="detail-sections">
			<div>
				<div className="detail-section__title">Rating Distribution</div>
				{dist &&
					[5, 4, 3, 2, 1].map((star) => (
						<DistributionBar
							key={star}
							label={"★".repeat(star)}
							count={dist[star] || 0}
							total={total}
							maxCount={max}
							variant="stars"
						/>
					))}
			</div>
			<div>
				<div className="detail-section__title">Summary</div>
				<Stat
					label="Average rating"
					value={`${avg} / 5`}
					tooltip="Average star rating (sum of all ratings ÷ total voters)"
					tooltipId={`${id}-avg-rating`}
				/>
				<Stat
					label="Total voters"
					value={total}
					tooltip="How many times this button was rated (each user can rate once)"
					tooltipId={`${id}-total-voters`}
				/>
			</div>
			<Rankings row={row} />
		</div>
	);
}
