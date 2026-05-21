import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Panes, Pane, Menu } from "components/Panes";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ButtonsImporter from "components/ButtonsImporter";
import Tooltip from "components/Tooltip";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import Header from "./Header";
import Cards from "./Cards";
import ButtonDetailsPanel from "./ButtonDetailsPanel";
import { sort } from "utils/sort";
import fake from "utils/fake";
import TagsCell from "./TagsCell";
import { ReactComponent as Clap } from "assets/icons/outline/hand.svg";
import { ReactComponent as Heart } from "assets/icons/outline/heart.svg";
import { ReactComponent as Thumb } from "assets/icons/outline/thumb-up.svg";
import { ReactComponent as Star } from "assets/icons/outline/star.svg";
import { ReactComponent as Folder } from "assets/icons/outline/folder-open.svg";
import { ReactComponent as Refresh } from "assets/icons/outline/refresh.svg";
import { ReactComponent as Upload } from "assets/icons/outline/cloud-upload.svg";
import { ReactComponent as ChevronDown } from "assets/icons/outline/chevron-down.svg";
import { ReactComponent as ChevronUp } from "assets/icons/outline/chevron-up.svg";
import {
	fetchAllClapButtons,
	fetchAllLikeButtons,
	fetchAllUpdownButtons,
	fetchAllRateButtons,
} from "ducks/buttons";
import useAsyncEffect from "utils/useAsyncEffect";
import { getButtonsMeta, getLikeButtons, getClapButtons, getUpdownButtons, getRateButtons } from "api";

const icons = {
	clap: <Clap className="card__icon" />,
	like: <Heart className="card__icon" />,
	updown: <Thumb className="card__icon" />,
	rate: <Star className="card__icon" />,
};

const typeLabels = {
	like: "Like",
	clap: "Clap",
	updown: "Up/Down",
	rate: "Rate",
};

export const typeDescriptions = {
	like: "A classic Twitter-like button. Visitors can only like once",
	clap: "A Medium-like button. Visitors can clap as many times as they want",
	updown: "A Reddit-like button. Visitors can only upvote or downvote once",
	rate: "A star rating button. Visitors can rate from 1 to 5 stars",
};

const fetchMap = {
	like: fetchAllLikeButtons,
	clap: fetchAllClapButtons,
	updown: fetchAllUpdownButtons,
	rate: fetchAllRateButtons,
};

const scoreLabels = {
	like: { label: "Likes", tooltip: "Total number of likes" },
	clap: { label: "Total Claps", tooltip: "Sum of all claps across all users" },
	updown: { label: "Net Score", tooltip: "Upvotes minus downvotes" },
	rate: { label: "Avg Rating", tooltip: "Average star rating (1–5)" },
};

function getHeadCells(buttonType) {
	const { label: scoreLabel, tooltip: scoreTooltip } = scoreLabels[
		buttonType
	] || { label: "Score", tooltip: "" };

	return [
		{
			id: "type",
			alignRight: false,
			label: "Type",
			tooltip: "Button type: like, clap, up/down, or rate",
			sortable: false,
		},
		{
			id: "name",
			alignRight: false,
			label: "Button ID",
			sortable: true,
			tooltip: "Unique path identifier: [namespace]/[id]",
		},
		{
			id: "tags",
			label: "Tags",
			alignRight: false,
			sortable: true,
			tooltip: "Custom labels for grouping and filtering",
		},
		{
			id: "total_votes",
			alignRight: true,
			label: "Voters",
			sortable: true,
			tooltip: "Number of unique users who interacted with this button",
		},
		{
			id: "score",
			alignRight: true,
			label: scoreLabel,
			sortable: true,
			tooltip: scoreTooltip,
		},
	];
}

function EnhancedTableHead({ order, orderBy, onRequestSort, buttonType }) {
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead className="table__head">
			<TableRow>
				<TableCell className="table__cell table__cell--expand" />
				{getHeadCells(buttonType).map((headCell) => (
					<TableCell
						className="table__cell"
						key={headCell.id}
						align={headCell.alignRight ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<span className="table__head-cell">
							{headCell.sortable ? (
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : "desc"}
									onClick={createSortHandler(headCell.id)}
								>
									{headCell.label}
									{orderBy === headCell.id && (
										<span className="table__visually-hidden">
											{order === "desc"
												? "sorted descending"
												: "sorted ascending"}
										</span>
									)}
								</TableSortLabel>
							) : (
								headCell.label
							)}
							{headCell.tooltip && (
								<Tooltip message={headCell.tooltip} id={`col-${headCell.id}`} />
							)}
						</span>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc", null]).isRequired,
	orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable({ hasButtons }) {
	const dispatch = useDispatch();
	const { namespace: currentNamespace, type: selectedButtonType } = useParams();
	const [order, setOrder] = useState("desc");
	const [orderBy, setOrderBy] = useState("score");
	const [currentPage, setCurrentPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalCount, setTotalCount] = useState(0);
	const [expandedRows, setExpandedRows] = useState({});
	const [showCards, setShowCards] = useState(false);
	const [selectedTag, setSelectedTag] = useState(null);

	const headCells = getHeadCells(selectedButtonType);
	const colSpan = headCells.length + 1;

	const toggleRow = useCallback((id) => {
		setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
	}, []);

	const selected = useSelector((state) => state.buttons);
	const buttons = [...Object.values(selected).map((b) => b.attributes)];

	const [typeNamespaces, setTypeNamespaces] = useState([]);
	const [hasNoNamespace, setHasNoNamespace] = useState(false);

	const namespaceFetchMap = {
		like: getLikeButtons,
		clap: getClapButtons,
		updown: getUpdownButtons,
		rate: getRateButtons,
	};

	useAsyncEffect(async () => {
		const response = await namespaceFetchMap[selectedButtonType]({ limit: 1000, page: 0, sort: "desc" });
		const attrs = (response.data || []).map((b) => b.attributes);
		setTypeNamespaces([...new Set(attrs.filter((b) => b.namespace).map((b) => b.namespace))].sort());
		setHasNoNamespace(attrs.some((b) => !b.namespace));
	}, [selectedButtonType]);

	const typeTags = [
		...new Set(
			buttons
				.filter((b) => b.type === selectedButtonType)
				.flatMap((b) => b.tags || []),
		),
	].sort();

	const rows = buttons.filter(
		(b) =>
			b.type === selectedButtonType &&
			(!currentNamespace ||
				currentNamespace === b.namespace ||
				(currentNamespace === "no-namespace" && !b.namespace)) &&
			(!selectedTag || (b.tags || []).includes(selectedTag)),
	);

	const tableButtons = hasButtons ? rows : fake;

	const handleFetchButtons = useCallback(
		async ({ page = 0, limit = 10, sort = "desc" } = {}) => {
			const options = { page, limit, sort };
			try {
				const result = await dispatch(
					fetchMap[selectedButtonType](
						currentNamespace
							? { ...options, namespace: currentNamespace }
							: options,
					),
				);
				setTotalCount(result.meta.total);
			} catch (error) {
				if (error.errors[0].code === "DEACTIVATED_ACCOUNT") {
					console.log(error);
				} else {
					throw error;
				}
			}
		},
		[dispatch, selectedButtonType, currentNamespace],
	);

	const handleFetchInitialState = useCallback(
		async ({ page = 0, limit = 10, sort = "desc" } = {}) => {
			try {
				const {
					meta: { total_likes },
				} = await getButtonsMeta();
				await Promise.all([
					dispatch(fetchMap.like({ page, limit, sort })),
					dispatch(fetchMap.clap({ page, limit, sort })),
					dispatch(fetchMap.updown({ page, limit, sort })),
					dispatch(fetchMap.rate({ page, limit, sort })),
				]);
				setTotalCount(total_likes);
			} catch (error) {
				if (error?.errors[0]?.code === "DEACTIVATED_ACCOUNT") {
					console.log(error);
				} else {
					throw error;
				}
			}
		},
		[setTotalCount, dispatch],
	);

	useAsyncEffect(async () => {
		await handleFetchInitialState();
		setOrder("desc");
		setCurrentPage(0);
		setRowsPerPage(10);
	}, []);

	useAsyncEffect(async () => {
		await handleFetchButtons();
		setOrder("desc");
		setCurrentPage(0);
		setRowsPerPage(10);
		setSelectedTag(null);
	}, [selectedButtonType, currentNamespace]);

	const handleRequestSort = useCallback(
		async (_event, property) => {
			const isAsc = orderBy === property && order === "asc";
			const selectedOrder = isAsc ? "desc" : "asc";
			await handleFetchButtons({
				page: currentPage,
				limit: rowsPerPage,
				sort: selectedOrder,
			});
			setOrder(selectedOrder);
			setOrderBy(property);
			setCurrentPage(0);
		},
		[handleFetchButtons, currentPage, order, orderBy, rowsPerPage],
	);

	const handleChangePage = useCallback(
		async (_event, newPage) => {
			await handleFetchButtons({ page: newPage, limit: rowsPerPage });
			setCurrentPage(newPage);
			setRowsPerPage(rowsPerPage);
		},
		[handleFetchButtons, rowsPerPage],
	);

	const handleChangeRowsPerPage = useCallback(
		async (event) => {
			const newPageLimit = parseInt(event.target.value, 10);
			await handleFetchButtons({ limit: newPageLimit, page: 0 });
			setRowsPerPage(newPageLimit);
			setCurrentPage(0);
		},
		[handleFetchButtons],
	);

	return (
		<>
			<Header
				icons={icons}
				namespace={currentNamespace}
				currentType={selectedButtonType}
			/>
			<Panes>
				<Menu>
					<ul className="menu space__bottom-4 menu__nav-list">
						<li className="menu__item">
							<Folder />
							<Link
								className="menu__item__label"
								to={`/dashboard/${selectedButtonType}`}
							>
								All
							</Link>
						</li>
						{(typeNamespaces.length > 0 || hasNoNamespace) && (
							<>
								<li className="menu__section-title">Namespaces</li>
								{typeNamespaces.map((namespace) => (
									<li key={namespace} className="menu__nav-item">
										<Link
											to={`/dashboard/${selectedButtonType}/${namespace}`}
											className={`menu__nav-link${currentNamespace === namespace ? " menu__nav-link--active" : ""}`}
										>
											<Folder />
											{namespace}
										</Link>
									</li>
								))}
								{hasNoNamespace && (
									<li className="menu__nav-item">
										<Link
											to={`/dashboard/${selectedButtonType}/no-namespace`}
											className={`menu__nav-link menu__nav-link--no-namespace${currentNamespace === "no-namespace" ? " menu__nav-link--active" : ""}`}
										>
											<Folder />
											no namespace
										</Link>
									</li>
								)}
							</>
						)}
					</ul>
					{typeTags.length > 0 && (
						<ul className="menu__tag-list">
							<li className="menu__section-title">Tags</li>
							{typeTags.map((tag) => (
								<li key={tag} className="menu__nav-item">
									<button
										className={`menu__tag-btn${selectedTag === tag ? " menu__tag-btn--active" : ""}`}
										onClick={() =>
											setSelectedTag(selectedTag === tag ? null : tag)
										}
									>
										<span className="menu__tag-btn__hash">#</span>
										{tag}
									</button>
								</li>
							))}
						</ul>
					)}
				</Menu>
				<Pane>
					<div>
						<TableContainer>
							<Table
								className="table"
								aria-labelledby="tableTitle"
								size={"small"}
								aria-label="enhanced table"
							>
								<EnhancedTableHead
									order={order}
									orderBy={orderBy}
									onRequestSort={handleRequestSort}
									buttonType={selectedButtonType}
								/>
								<TableBody>
									{sort(tableButtons, order, orderBy)
										.slice(
											currentPage * rowsPerPage,
											currentPage * rowsPerPage + rowsPerPage,
										)
										.map((row, index) => {
											const isExpanded = !!expandedRows[row.id];
											return (
												<React.Fragment key={`tableRow${index}`}>
													<TableRow
														hover
														onClick={() => toggleRow(row.id)}
														className="table__row--clickable"
													>
														<TableCell className="table__cell--expand">
															<div className="table__expand-btn">
																{isExpanded ? <ChevronUp /> : <ChevronDown />}
															</div>
														</TableCell>
														<TableCell className="table__cell">
															<div className="table__type-cell">
																{icons[row.type]}
																<span className="table__type-cell__label">
																	{typeLabels[row.type]}
																</span>
															</div>
														</TableCell>
														<TableCell className="table__cell">
															<div className="table__id-cell">
																{!currentNamespace &&
																	(row.namespace ? (
																		<span className="table__namespace-badge">
																			{row.namespace}
																		</span>
																	) : (
																		<span className="table__no-namespace">
																			no namespace
																		</span>
																	))}
																{!currentNamespace && row.namespace && (
																	<span className="table__separator">/</span>
																)}
																<span className="table__id-badge">
																	{row.name}
																</span>
															</div>
														</TableCell>
														<TableCell
															className="table__cell"
															onClick={(e) => e.stopPropagation()}
														>
															<TagsCell
																currentTags={row.tags}
																buttonId={row.id}
															/>
														</TableCell>
														<TableCell className="table__cell" align="right">
															{row.total_votes}
														</TableCell>
														<TableCell className="table__cell" align="right">
															{row.type === "rate" && row.score > 0
																? parseFloat(
																		(row.score / row.total_votes).toFixed(1),
																	)
																: row.score}
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell
															colSpan={colSpan}
															className={`table__cell--collapse${isExpanded ? "" : " table__cell--collapse-hidden"}`}
														>
															<Collapse
																in={isExpanded}
																timeout="auto"
																unmountOnExit
															>
																<ButtonDetailsPanel row={row} />
															</Collapse>
														</TableCell>
													</TableRow>
												</React.Fragment>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							className="table__cell"
							rowsPerPageOptions={[10, 25, 50, 100]}
							component="div"
							count={totalCount}
							rowsPerPage={rowsPerPage}
							page={currentPage}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
						<div className="summary-toggle">
							<button
								className="summary-toggle__btn"
								onClick={() => setShowCards((v) => !v)}
							>
								{showCards ? <ChevronUp /> : <ChevronDown />}
								{showCards ? "Hide summary" : "Show summary"}
							</button>
							<Collapse in={showCards} timeout="auto">
								<Cards
									buttons={tableButtons}
									currentNamespace={currentNamespace}
									currentTotalCount={totalCount}
								/>
							</Collapse>
						</div>
						<div className="table-toolbar">
							<div className="table-toolbar__section">
								<div className="table-toolbar__title">
									<Refresh />
									Refresh buttons
									<Tooltip
										id="refresh"
										message="Reloads the current list from the server. Useful if you just imported data or made changes elsewhere."
									/>
								</div>
								<p className="table-toolbar__desc">
									Reload the list to see the latest data.
								</p>
								<button
									className="table-toolbar__btn"
									onClick={handleFetchButtons}
								>
									<Refresh />
									Refresh now
								</button>
							</div>
							<div className="table-toolbar__section">
								<div className="table-toolbar__title">
									<Upload />
									Import buttons &amp; votes
									<Tooltip
										id="csv"
										message="Columns: path (required), amount (required), session_id (optional). Without session_id, each row creates `amount` unique voters. With session_id, creates one vote from that specific session. Valid paths: [button_type]-buttons/[namespace]/[id]"
									/>
								</div>
								<p className="table-toolbar__desc">
									Upload a CSV to bulk-import buttons and vote counts. Download
									the sample file to see the expected format.
								</p>
								<div className="table-toolbar__import-row">
									<ButtonsImporter onFinishImporting={handleFetchButtons} />
									<a
										href="/test-import.csv"
										download
										className="table-toolbar__download"
									>
										Download sample CSV
									</a>
								</div>
							</div>
						</div>
					</div>
				</Pane>
			</Panes>
		</>
	);
}
