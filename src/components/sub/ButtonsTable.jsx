import React from "react";
import { useSelector } from "react-redux";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { useParams } from "react-router-dom";

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

  console.log(buttons);

  const handleSort = (key, sortType) => {
    return sortByKey(buttons, key, sortType);
  };

  const NameCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      {rowData.type}:{rowData.namespace}:{rowData.name}
    </Cell>
  );

  return (
    <div>
      <h2 className="pane__title">{namespace || "All buttons"}</h2>
      <Table
        data={buttons}
        autoHeight
        sortColumn="score"
        defaultSortType="desc"
        onSortColumn={handleSort}
      >
        <Column flexGrow={2}>
          <HeaderCell>Name</HeaderCell>
          <NameCell />
        </Column>

        <Column sortable flexGrow={1}>
          <HeaderCell>Counter</HeaderCell>
          <Cell dataKey="score" />
        </Column>
      </Table>
    </div>
  );
}
