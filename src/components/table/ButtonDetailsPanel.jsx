import React from "react";
import TagsCell from "./TagsCell";
import ActionsCell from "./ActionsCell";
import RateDetails from "./details/RateDetails";
import UpdownDetails from "./details/UpdownDetails";
import LikeDetails from "./details/LikeDetails";
import ClapDetails from "./details/ClapDetails";

export default function ButtonDetailsPanel({ row }) {
	return (
		<div className="btn-detail">
			<div className="btn-detail__meta">
				<div className="btn-detail__meta-item">
					<span className="btn-detail__meta-label">Namespace</span>
					{row.namespace ? (
						<span className="table__namespace-badge">{row.namespace}</span>
					) : (
						<span className="table__no-namespace">none</span>
					)}
				</div>
				<div className="btn-detail__meta-item">
					<span className="btn-detail__meta-label">ID</span>
					<span className="table__id-badge">{row.name}</span>
				</div>
			</div>
			<div className="btn-detail__tags">
				<span className="btn-detail__meta-label">Tags</span>
				<TagsCell buttonId={row.id} />
				<span className="btn-detail__tags-hint">click to edit</span>
			</div>
			<div className="btn-detail__body">
				<div className="btn-detail__stats">
					{row.type === "rate" && <RateDetails row={row} />}
					{row.type === "updown" && <UpdownDetails row={row} />}
					{row.type === "like" && <LikeDetails row={row} />}
					{row.type === "clap" && <ClapDetails row={row} />}
				</div>
				<div className="btn-detail__actions">
					<ActionsCell buttonId={row.id} variant="panel" />
				</div>
			</div>
		</div>
	);
}
