import React from "react";
import Stat from "../Stat";
import Rankings from "../Rankings";
import DistributionBar from "../DistributionBar";

export default function UpdownDetails({ row }) {
	const id = row.id;
	const total = row.total_votes || 0;
	const upvotes = Math.round((total + row.score) / 2);
	const downvotes = Math.round((total - row.score) / 2);
	const upPct = total > 0 ? Math.round((upvotes / total) * 100) : 0;

	return (
		<div className="detail-sections">
			<div>
				<div className="detail-section__title">Vote Breakdown</div>
				<DistributionBar
					label="👍 Upvotes"
					count={upvotes}
					total={total}
					maxCount={total}
					variant="vote"
				/>
				<DistributionBar
					label="👎 Downvotes"
					count={downvotes}
					total={total}
					maxCount={total}
					variant="vote"
				/>
			</div>
			<div>
				<div className="detail-section__title">Summary</div>
				<Stat
					label="Total votes"
					value={total}
					tooltip="Total number of votes cast (upvotes + downvotes)"
					tooltipId={`${id}-total-votes`}
				/>
				<Stat
					label="Net score"
					value={row.score}
					tooltip="Upvotes minus downvotes"
					tooltipId={`${id}-net-score`}
				/>
				<Stat
					label="Approval"
					value={`${upPct}%`}
					tooltip="Percentage of votes that were upvotes"
					tooltipId={`${id}-approval`}
				/>
			</div>
			<Rankings row={row} />
		</div>
	);
}
