import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Panes, Pane, Menu } from 'components/Panes';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import ButtonsImporter from 'components/ButtonsImporter';
import Tooltip from 'components/Tooltip';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Collapse from '@material-ui/core/Collapse';
import { Link } from 'react-router-dom';
import Header from './Header';
import Cards from './Cards';
import { sort } from 'utils/sort';
import fake from 'utils/fake';
import ActionsCell from './ActionsCell';
import TagsCell from './TagsCell';
import { ReactComponent as Clap } from 'assets/icons/outline/hand.svg';
import { ReactComponent as Heart } from 'assets/icons/outline/heart.svg';
import { ReactComponent as Thumb } from 'assets/icons/outline/thumb-up.svg';
import { ReactComponent as Star } from 'assets/icons/outline/star.svg';
import { ReactComponent as Folder } from 'assets/icons/outline/folder-open.svg';
import { ReactComponent as Refresh } from 'assets/icons/outline/refresh.svg';
import { ReactComponent as Upload } from 'assets/icons/outline/cloud-upload.svg';
import { ReactComponent as ChevronDown } from 'assets/icons/outline/chevron-down.svg';
import { ReactComponent as ChevronUp } from 'assets/icons/outline/chevron-up.svg';
import {
  fetchAllClapButtons,
  fetchAllLikeButtons,
  fetchAllUpdownButtons,
  fetchAllRateButtons,
} from 'ducks/buttons';
import useAsyncEffect from 'utils/useAsyncEffect';
import { getButtonsMeta } from 'api';

const icons = {
  clap: <Clap className="card__icon" />,
  like: <Heart className="card__icon" />,
  updown: <Thumb className="card__icon" />,
  rate: <Star className="card__icon" />,
};

const fetchMap = {
  like: fetchAllLikeButtons,
  clap: fetchAllClapButtons,
  updown: fetchAllUpdownButtons,
  rate: fetchAllRateButtons,
};

const headCells = [
  { id: 'type', alignRight: false, label: 'Type' },
  { id: 'name', alignRight: false, label: 'ID', sortable: true },
  { id: 'tags', label: 'Tags', alignRight: false, sortable: true },
  { id: 'total_votes', alignRight: true, label: 'Total Votes', sortable: true },
  { id: 'score', alignRight: true, label: 'Score', sortable: true },
];

function Stat({ label, value, tooltip, tooltipId }) {
  return (
    <div style={{ marginBottom: '6px', fontSize: '13px', color: '#444', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span>{label}:</span>
      {tooltip && tooltipId && <Tooltip message={tooltip} id={tooltipId} />}
      <strong style={{ marginLeft: '2px' }}>{value}</strong>
    </div>
  );
}

function RateDetails({ row }) {
  const id = row.id;
  const dist = row.votes_distribution;
  const avg = row.score > 0 ? parseFloat((row.score / row.total_votes).toFixed(2)) : 0;
  const total = row.total_votes || 0;
  const max = dist ? Math.max(...[1, 2, 3, 4, 5].map((s) => dist[s] || 0)) : 0;

  return (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
      <div>
        <div style={sectionTitle}>Rating Distribution</div>
        {dist && [5, 4, 3, 2, 1].map((star) => {
          const count = dist[star] || 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const barWidth = max > 0 ? Math.round((count / max) * 160) : 0;
          return (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: '#f5a623', width: '36px', flexShrink: 0 }}>{'★'.repeat(star)}</span>
              <div style={{ width: '160px', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', flexShrink: 0 }}>
                <div style={{ width: `${barWidth}px`, height: '100%', backgroundColor: '#f5a623', borderRadius: '4px', transition: 'width 0.3s ease' }} />
              </div>
              <span style={{ fontSize: '12px', color: '#888', width: '24px' }}>{count}</span>
              <span style={{ fontSize: '11px', color: '#bbb' }}>({pct}%)</span>
            </div>
          );
        })}
      </div>
      <div>
        <div style={sectionTitle}>Summary</div>
        <Stat label="Average rating" value={`${avg} / 5`} tooltip="Average star rating with decimal precision (sum of all ratings ÷ total voters)" tooltipId={`${id}-avg-rating`} />
        <Stat label="Total voters" value={total} tooltip="How many times this button was rated (each user can rate once)" tooltipId={`${id}-total-voters`} />
      </div>
      <Rankings row={row} />
    </div>
  );
}

function UpdownDetails({ row }) {
  const id = row.id;
  const total = row.total_votes || 0;
  const upvotes = Math.round((total + row.score) / 2);
  const downvotes = Math.round((total - row.score) / 2);
  const upPct = total > 0 ? Math.round((upvotes / total) * 100) : 0;

  return (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
      <div>
        <div style={sectionTitle}>Vote Breakdown</div>
        {[['👍 Upvotes', upvotes], ['👎 Downvotes', downvotes]].map(([label, count]) => {
          const barWidth = total > 0 ? Math.round((count / total) * 160) : 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: '#555', width: '80px', flexShrink: 0 }}>{label}</span>
              <div style={{ width: '160px', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', flexShrink: 0 }}>
                <div style={{ width: `${barWidth}px`, height: '100%', backgroundColor: '#4a90e2', borderRadius: '4px', transition: 'width 0.3s ease' }} />
              </div>
              <span style={{ fontSize: '12px', color: '#888', width: '24px' }}>{count}</span>
              <span style={{ fontSize: '11px', color: '#bbb' }}>({pct}%)</span>
            </div>
          );
        })}
      </div>
      <div>
        <div style={sectionTitle}>Summary</div>
        <Stat label="Total votes" value={total} tooltip="Total number of votes cast (upvotes + downvotes)" tooltipId={`${id}-total-votes`} />
        <Stat label="Net score" value={row.score} tooltip="Upvotes minus downvotes" tooltipId={`${id}-net-score`} />
        <Stat label="Approval" value={`${upPct}%`} tooltip="Percentage of votes that were upvotes" tooltipId={`${id}-approval`} />
      </div>
      <Rankings row={row} />
    </div>
  );
}

const sectionTitle = {
  fontSize: '11px', fontWeight: 600, color: '#555',
  marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em',
};

function Rankings({ row }) {
  const id = row.id;
  return (
    <div>
      <div style={sectionTitle}>Rankings</div>
      <Stat label="Overall ranking" value={`#${row.total_ranking}`} tooltip="Position of this button ranked by score among all buttons of this type" tooltipId={`${id}-total-ranking`} />
      {row.namespace && <Stat label="Namespace ranking" value={`#${row.namespace_ranking}`} tooltip="Position within this namespace, compared to buttons of the same type" tooltipId={`${id}-ns-ranking`} />}
    </div>
  );
}

function LikeDetails({ row }) {
  const id = row.id;
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <div>
        <div style={sectionTitle}>Summary</div>
        <Stat label="Total likes" value={row.score || 0} tooltip="How many times this button has been liked. Each user can like only once." tooltipId={`${id}-total-likes`} />
      </div>
      <Rankings row={row} />
    </div>
  );
}

function ClapDetails({ row }) {
  const id = row.id;
  const avgClaps = row.total_votes > 0
    ? parseFloat((row.score / row.total_votes).toFixed(1))
    : 0;
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <div>
        <div style={sectionTitle}>Summary</div>
        <Stat label="Total claps" value={row.score || 0} tooltip="Total number of claps across all users. Users can clap multiple times." tooltipId={`${id}-total-claps`} />
        <Stat label="Unique clappers" value={row.total_votes || 0} tooltip="Number of distinct users who clapped at least once" tooltipId={`${id}-unique-clappers`} />
        <Stat label="Avg claps per user" value={avgClaps} tooltip="Average number of claps per unique user" tooltipId={`${id}-avg-claps`} />
      </div>
      <Rankings row={row} />
    </div>
  );
}

function ButtonDetailsPanel({ row }) {
  return (
    <div style={{ padding: '12px 24px 16px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        {row.namespace && (
          <>
            <span style={{ fontSize: '12px', backgroundColor: '#e8f0fe', color: '#3b5bdb', borderRadius: '4px', padding: '2px 8px', fontWeight: 500 }}>
              {row.namespace}
            </span>
            <span style={{ color: '#ccc', fontSize: '14px' }}>/</span>
          </>
        )}
        <span style={{ fontSize: '12px', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '4px', padding: '2px 8px', fontFamily: 'monospace' }}>
          {row.name}
        </span>
        {!row.namespace && (
          <span style={{ fontSize: '11px', color: '#bbb', fontStyle: 'italic' }}>no namespace</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>Tags</span>
        <TagsCell buttonId={row.id} />
      </div>
      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          {row.type === 'rate' && <RateDetails row={row} />}
          {row.type === 'updown' && <UpdownDetails row={row} />}
          {row.type === 'like' && <LikeDetails row={row} />}
          {row.type === 'clap' && <ClapDetails row={row} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '28px' }}>
          <ActionsCell buttonId={row.id} variant="panel" />
        </div>
      </div>
    </div>
  );
}

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="table__head">
      <TableRow>
        <TableCell className="table__cell" style={{ width: 32 }} />
        {headCells.map((headCell) => (
          <TableCell
            className="table__cell"
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'desc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className="table__visually-hidden">
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              <span>{headCell.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc', null]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable({ hasButtons }) {
  const dispatch = useDispatch();
  const { namespace: currentNamespace, type: selectedButtonType } = useParams();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('score');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});

  const colSpan = headCells.length + 1;

  const toggleRow = useCallback((id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const selected = useSelector((state) => state.buttons);
  const buttons = [...Object.values(selected).map((b) => b.attributes)];

  const typeNamespaces = [...new Set(
    buttons.filter((b) => b.type === selectedButtonType && b.namespace).map((b) => b.namespace)
  )].sort();

  const rows = buttons.filter(
    (b) =>
      b.type === selectedButtonType &&
      (!currentNamespace ||
        currentNamespace === b.namespace ||
        (currentNamespace === 'no-namespace' && !b.namespace)),
  );

  const tableButtons = hasButtons ? rows : fake;

  const handleFetchButtons = useCallback(
    async ({ page = 0, limit = 10, sort = 'desc' } = {}) => {
      const options = { page, limit, sort };
      try {
        const result = await dispatch(
          fetchMap[selectedButtonType](
            currentNamespace ? { ...options, namespace: currentNamespace } : options,
          ),
        );
        setTotalCount(result.meta.total);
      } catch (error) {
        if (error.errors[0].code === 'DEACTIVATED_ACCOUNT') {
          console.log(error);
        } else {
          throw error;
        }
      }
    },
    [dispatch, selectedButtonType, currentNamespace],
  );

  const handleFetchInitialState = useCallback(
    async ({ page = 0, limit = 10, sort = 'desc' } = {}) => {
      try {
        const { meta: { total_likes } } = await getButtonsMeta();
        await Promise.all([
          dispatch(fetchMap.like({ page, limit, sort })),
          dispatch(fetchMap.clap({ page, limit, sort })),
          dispatch(fetchMap.updown({ page, limit, sort })),
          dispatch(fetchMap.rate({ page, limit, sort })),
        ]);
        setTotalCount(total_likes);
      } catch (error) {
        if (error?.errors[0]?.code === 'DEACTIVATED_ACCOUNT') {
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
    setOrder('desc');
    setCurrentPage(0);
    setRowsPerPage(10);
  }, []);

  useAsyncEffect(async () => {
    await handleFetchButtons();
    setOrder('desc');
    setCurrentPage(0);
    setRowsPerPage(10);
  }, [selectedButtonType, currentNamespace]);

  const handleRequestSort = useCallback(
    async (_event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      const selectedOrder = isAsc ? 'desc' : 'asc';
      await handleFetchButtons({ page: currentPage, limit: rowsPerPage, sort: selectedOrder });
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
      <Header icons={icons} namespace={currentNamespace} currentType={selectedButtonType} />
      <Panes>
        <Menu>
          <ul className="menu space__bottom-4">
            <li className="menu__item">
              <Folder />
              <Link className="menu__item__label" to={`/dashboard/${selectedButtonType}`}>
                All
              </Link>
            </li>
            <div className="menu__folders">
              {typeNamespaces.map((namespace) => (
                <li key={namespace} className="menu__item">
                  <Folder />
                  <Link className="menu__item__label" to={`/dashboard/${selectedButtonType}/${namespace}`}>
                    {namespace}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </Menu>
        <Pane>
          <div>
            <Cards buttons={tableButtons} currentNamespace={currentNamespace} currentTotalCount={totalCount} />
            <TableContainer>
              <Table className="table" aria-labelledby="tableTitle" size={'small'} aria-label="enhanced table">
                <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                <TableBody>
                  {sort(tableButtons, order, orderBy)
                    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isExpanded = !!expandedRows[row.id];
                      return (
                        <React.Fragment key={`tableRow${index}`}>
                          <TableRow hover>
                            <TableCell className="table__cell" style={{ width: 32, padding: '0 4px' }}>
                              <button
                                onClick={() => toggleRow(row.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#999' }}
                              >
                                {isExpanded
                                  ? <ChevronUp style={{ width: 16, height: 16 }} />
                                  : <ChevronDown style={{ width: 16, height: 16 }} />
                                }
                              </button>
                            </TableCell>
                            <TableCell className="table__cell">{icons[row.type]}</TableCell>
                            <TableCell className="table__cell">
                              {!currentNamespace ? `${row.namespace || 'no-namespace'}/` : ''}
                              {row.name}
                            </TableCell>
                            <TableCell className="table__cell">
                              <TagsCell currentTags={row.tags} buttonId={row.id} />
                            </TableCell>
                            <TableCell className="table__cell" align="right">{row.total_votes}</TableCell>
                            <TableCell className="table__cell" align="right">
                              {row.type === 'rate' && row.score > 0
                                ? parseFloat((row.score / row.total_votes).toFixed(1))
                                : row.score}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={colSpan} style={{ paddingBottom: 0, paddingTop: 0, borderBottom: isExpanded ? undefined : 'none' }}>
                              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
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
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px 0', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '12px 14px', fontSize: '12px', color: '#555' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginBottom: '4px' }}>
                  <Refresh style={{ width: 14, height: 14 }} />
                  Refresh buttons
                  <Tooltip id="refresh" message="Reloads the current list from the server. Useful if you just imported data or made changes elsewhere." />
                </div>
                <p style={{ margin: 0, color: '#999', lineHeight: 1.4 }}>Reload the list to see the latest data.</p>
                <button
                  onClick={handleFetchButtons}
                  style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px', color: '#555' }}
                >
                  <Refresh style={{ width: 12, height: 12 }} />
                  Refresh now
                </button>
              </div>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '12px 14px', fontSize: '12px', color: '#555' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginBottom: '4px' }}>
                  <Upload style={{ width: 14, height: 14 }} />
                  Import buttons &amp; votes
                  <Tooltip id="csv" message="Import multiple buttons at once by uploading a CSV file. The CSV must have the following headers: path and amount. It will accept only valid Lyket urls, ie. [button_type]-buttons/[namespace]/[id]" />
                </div>
                <p style={{ margin: '0 0 10px', color: '#999', lineHeight: 1.4 }}>Upload a CSV to bulk-import buttons and vote counts. Download the sample file to see the expected format.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ButtonsImporter onFinishImporting={handleFetchButtons} />
                  <a
                    href="/test-import.csv"
                    download
                    style={{ color: '#888', fontSize: '12px', textDecoration: 'underline' }}
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
