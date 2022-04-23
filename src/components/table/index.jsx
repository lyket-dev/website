import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Header from "./Header";
import Cards from "./Cards";
import { sort } from "utils/sort";
import { ReactComponent as Clap } from "assets/icons/outline/hand.svg";
import { ReactComponent as Heart } from "assets/icons/outline/heart.svg";
import { ReactComponent as Thumb } from "assets/icons/outline/thumb-up.svg";
import ActionsCell from "./ActionsCell";
import TagsCell from "./TagsCell";

const icons = {
  clap: <Clap className="card__icon" />,
  like: <Heart className="card__icon" />,
  updown: <Thumb className="card__icon" />,
};

const headCells = [
  {
    id: "type",
    alignRight: false,
    label: "Type",
  },
  {
    id: "name",
    alignRight: false,
    label: "ID",
    sortable: true,
  },
  {
    id: "tags",
    label: "Tags",
    alignRight: false,
    sortable: true,
  },
  {
    id: "total_votes",
    alignRight: true,
    label: "Total Votes",
    sortable: true,
  },
  {
    id: "score",
    alignRight: true,
    label: "Score",
    sortable: true,
  },
  { id: "actions", alignRight: true, disablePadding: false, label: "Actions" },
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
            align={headCell.alignRight ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "desc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className="table__visually-hidden">
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc", null]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable({ onPaginate, totalCount }) {
  const { namespace, type } = useParams();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("score");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = useSelector((state) => {
    let selected = [...Object.values(state.buttons).map((b) => b.attributes)];

    if (namespace) {
      selected = selected.filter((b) => {
        if (namespace === "no-namespace") {
          return b.namespace === null;
        } else {
          return b.namespace === namespace;
        }
      });
    }

    return selected.filter((b) => b.type === type);
  });

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === "asc";
    // fetchPaginatedResult
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = async (event, newPage) => {
    await onPaginate({ page: newPage, limit: rowsPerPage });
    setCurrentPage(newPage);
    setRowsPerPage(rowsPerPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    const newPageLimit = parseInt(event.target.value, 10);
    await onPaginate({ limit: newPageLimit, page: 0 });
    setRowsPerPage(newPageLimit);
    setCurrentPage(0);
  };

  return (
    <div>
      <Header namespace={namespace} currentType={type} icons={icons} />
      <Cards buttons={rows} currentNamespace={namespace} />
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
          />
          <TableBody>
            {sort(rows, order, orderBy)
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              .map((row, index) => {
                return (
                  <TableRow hover key={`tableRow${index}`}>
                    <TableCell className="table__cell">
                      {icons[row.type]}
                    </TableCell>
                    <TableCell className="table__cell">
                      {!namespace && row.namespace ? `${row.namespace}/` : ""}
                      {row.name}
                    </TableCell>
                    <TableCell className="table__cell">
                      <TagsCell currentTags={row.tags} buttonId={row.id} />
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
  );
}
