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
import { ReactComponent as Folder } from 'assets/icons/outline/folder-open.svg';
import { ReactComponent as Refresh } from 'assets/icons/outline/refresh.svg';
import { ReactComponent as Upload } from 'assets/icons/outline/cloud-upload.svg';
import {
  fetchAllClapButtons,
  fetchAllLikeButtons,
  fetchAllUpdownButtons,
} from 'ducks/buttons';
import useAsyncEffect from 'utils/useAsyncEffect';
import { getButtonsMeta } from 'api';

const icons = {
  clap: <Clap className="card__icon" />,
  like: <Heart className="card__icon" />,
  updown: <Thumb className="card__icon" />,
};

const fetchMap = {
  like: fetchAllLikeButtons,
  clap: fetchAllClapButtons,
  updown: fetchAllUpdownButtons,
};

const headCells = [
  {
    id: 'type',
    alignRight: false,
    label: 'Type',
  },
  {
    id: 'name',
    alignRight: false,
    label: 'ID',
    sortable: true,
  },
  {
    id: 'tags',
    label: 'Tags',
    alignRight: false,
    sortable: true,
  },
  {
    id: 'total_votes',
    alignRight: true,
    label: 'Total Votes',
    sortable: true,
  },
  {
    id: 'score',
    alignRight: true,
    label: 'Score',
    sortable: true,
  },
  { id: 'actions', alignRight: true, disablePadding: false, label: 'Actions' },
];
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="table__head">
      <TableRow>
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
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
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
  const [allNamespaces, setAllNamespaces] = useState([]);

  const selected = useSelector((state) => state.buttons);
  const buttons = [...Object.values(selected).map((b) => b.attributes)];

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
      const options = {
        page,
        limit,
        sort,
      };

      try {
        const result = await dispatch(
          fetchMap[selectedButtonType](
            currentNamespace
              ? { ...options, namespace: currentNamespace }
              : options,
          ),
        );

        console.log(result);

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
        const {
          meta: { total_likes, all_namespaces },
        } = await getButtonsMeta();

        await Promise.all([
          dispatch(fetchMap['like']({ page, limit, sort })),
          dispatch(fetchMap['clap']({ page, limit, sort })),
          dispatch(fetchMap['updown']({ page, limit, sort })),
        ]);

        setTotalCount(total_likes);
        setAllNamespaces(all_namespaces);
      } catch (error) {
        if (error?.errors[0]?.code === 'DEACTIVATED_ACCOUNT') {
          console.log(error);
        } else {
          throw error;
        }
      }
    },
    [setTotalCount, setAllNamespaces, dispatch],
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
      await handleFetchButtons({
        page: newPage,
        limit: rowsPerPage,
      });
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
      <Panes minSize={50}>
        <Menu>
          <ul className="menu space__bottom-4">
            <li className="menu__item">
              <Folder />
              <Link
                className="menu__item__label"
                to={`/dashboard/${selectedButtonType}`}
              >
                All
              </Link>
            </li>
            {allNamespaces.map((n) => {
              const namespace = n ? n : 'no-namespace';
              return (
                <li key={namespace} className="menu__item">
                  <Folder />
                  <Link
                    className="menu__item__label"
                    to={`/dashboard/${selectedButtonType}/${namespace}`}
                  >
                    {namespace}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="menu__item" onClick={handleFetchButtons}>
            <Refresh />
            <span className="menu__item__label">Refresh buttons!</span>
          </button>
          <div className="menu__item">
            <Upload />
            <span className="menu__item__label">Import buttons & votes</span>
            <Tooltip
              id="csv"
              message="Import multiple buttons at once by uploading a CSV file. The CSV must have the following headers: path and amount. It will accept only valid Lyket urls, ie. [button_type]-buttons/[namespace]/[id]"
            />
          </div>
          <ButtonsImporter onFinishImporting={handleFetchButtons} />
          <div className="space__bottom-2 smallprint">
            <a href="/test-import.csv" download>
              Download test CSV file
            </a>
          </div>
        </Menu>
        <Pane>
          <div>
            <Cards
              buttons={tableButtons}
              currentNamespace={currentNamespace}
              currentTotalCount={totalCount}
            />
            <TableContainer>
              <Table
                className="table"
                aria-labelledby="tableTitle"
                size={'small'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {sort(tableButtons, order, orderBy)
                    .slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage,
                    )
                    .map((row, index) => {
                      return (
                        <TableRow hover key={`tableRow${index}`}>
                          <TableCell className="table__cell">
                            {icons[row.type]}
                          </TableCell>
                          <TableCell className="table__cell">
                            {!currentNamespace
                              ? `${row.namespace || 'no-namespace'}/`
                              : ''}
                            {row.name}
                          </TableCell>
                          <TableCell className="table__cell">
                            <TagsCell
                              currentTags={row.tags}
                              buttonId={row.id}
                            />
                          </TableCell>
                          <TableCell className="table__cell" align="right">
                            {row.total_votes}
                          </TableCell>
                          <TableCell className="table__cell" align="right">
                            {row.score}
                          </TableCell>
                          <ActionsCell buttonId={row.id} />
                        </TableRow>
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
          </div>
        </Pane>
      </Panes>
    </>
  );
}
