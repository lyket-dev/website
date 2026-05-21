import React from "react";

export default function DistributionBar({ label, count, total, maxCount, variant }) {
	const pct = total > 0 ? Math.round((count / total) * 100) : 0;
	const barWidth = maxCount > 0 ? Math.round((count / maxCount) * 160) : 0;

	return (
		<div className="detail-bar">
			<span className={`detail-bar__label detail-bar__label--${variant}`}>
				{label}
			</span>
			<div className="detail-bar__track">
				<div
					className={`detail-bar__fill detail-bar__fill--${variant}`}
					style={{ width: `${barWidth}px` }}
				/>
			</div>
			<span className="detail-bar__count">{count}</span>
			<span className="detail-bar__pct">({pct}%)</span>
		</div>
	);
}
