import React from "react";
import Stat from "./Stat";

export default function Rankings({ row }) {
	const id = row.id;
	const typeTotal = row.type_total;
	const nsTotal = row.type_namespace_total;

	const typeRank =
		typeTotal != null && row.type_total_ranking != null
			? `#${typeTotal - row.type_total_ranking}/${typeTotal}`
			: row.type_total_ranking != null
				? `#${row.type_total_ranking + 1}`
				: "—";

	const nsRank =
		nsTotal != null && row.type_namespace_ranking != null
			? `#${nsTotal - row.type_namespace_ranking}/${nsTotal}`
			: row.type_namespace_ranking != null
				? `#${row.type_namespace_ranking + 1}`
				: "—";

	return (
		<div>
			<div className="detail-section__title">Rankings</div>
			<Stat
				label="By type"
				value={typeRank}
				tooltip={`Position among all ${row.type} buttons across your account`}
				tooltipId={`${id}-type-ranking`}
			/>
			{row.namespace && (
				<Stat
					label="By namespace"
					value={nsRank}
					tooltip={`Position among ${row.type} buttons in the "${row.namespace}" namespace`}
					tooltipId={`${id}-ns-ranking`}
				/>
			)}
		</div>
	);
}
