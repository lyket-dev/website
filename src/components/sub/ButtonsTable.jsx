import React from "react";
import { useSelector } from "react-redux";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { useParams } from "react-router-dom";
import Cards from "components/sub/Cards";
import humanizeString from "humanize-string";
import { ReactComponent as Clap } from "assets/icons/outline/plus-circle.svg";
import { ReactComponent as Heart } from "assets/icons/outline/heart.svg";
import { ReactComponent as Thumb } from "assets/icons/outline/thumb-up.svg";

const icons = {
  clap: <Clap className="card__icon" />,
  like: <Heart className="card__icon" />,
  updown: <Thumb className="card__icon" />,
};

const sortByKey = (items, key, type) => {
  if (type === "asc") {
    return items.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  } else {
    return items.sort((a, b) => (b[key] > a[key] ? 1 : -1));
  }
};

export default function ButtonsTable() {
  let { namespace } = useParams();

  const buttons = useSelector((state) => {
    if (namespace) {
      return Object.values(state.buttons)
        .map((b) => b.attributes)
        .filter((b) => {
          if (namespace === "no-namespace") {
            return b.namespace === null;
          } else {
            return b.namespace === namespace;
          }
        });
    } else {
      return Object.values(state.buttons).map((b) => b.attributes);
    }
  });

  const handleSort = (key, sortType) => {
    return sortByKey(buttons, key, sortType);
  };

  const IconCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      <div className="flex">
        {icons[rowData.type]}
        <div>{rowData.type}</div>
      </div>
    </Cell>
  );

  const NameCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      {rowData.type}:{rowData.namespace}:{rowData.name}
    </Cell>
  );

  return (
    <div>
      <h2 className="pane__title">
        {namespace ? humanizeString(namespace) : "All buttons"}
      </h2>
      <Cards buttons={buttons} />
      <Table
        data={buttons}
        autoHeight
        sortColumn="score"
        defaultSortType="desc"
        onSortColumn={handleSort}
      >
        <Column flexGrow={1}>
          <HeaderCell>Type</HeaderCell>
          <IconCell />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Name</HeaderCell>
          <NameCell />
        </Column>

        <Column>
          <HeaderCell>Total Votes</HeaderCell>
          <Cell dataKey="total_votes" />
        </Column>

        <Column sortable>
          <HeaderCell>Counter</HeaderCell>
          <Cell dataKey="score" />
        </Column>
      </Table>
    </div>
  );
}
