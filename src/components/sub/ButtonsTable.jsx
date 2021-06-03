import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { useParams } from "react-router-dom";
import Cards from "components/sub/Cards";
import humanizeString from "humanize-string";
import { ReactComponent as Clap } from "assets/icons/outline/hand.svg";
import { ReactComponent as Heart } from "assets/icons/outline/heart.svg";
import { ReactComponent as Thumb } from "assets/icons/outline/thumb-up.svg";
import ActionsCell from "./table/ActionsCell";

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
  const [currentType, setCurrentType] = useState("like");

  const buttons = useSelector((state) => {
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

    selected = selected.filter((b) => b.type === currentType);

    return sortByKey(selected, "score", "desc");
  });

  const handleSort = (key, sortType) => {
    return sortByKey(buttons, key, sortType);
  };

  const IconCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      <div className="flex">{icons[rowData.type]}</div>
    </Cell>
  );

  const NameCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      {rowData.namespace ? `${rowData.namespace}/` : ""}
      {rowData.name}
    </Cell>
  );

  const handleChangeType = (type) => (event) => {
    event.preventDefault();
    setCurrentType(type);
  };

  const renderTypeMenu = () => {
    return (
      <div className="type-menu">
        <a
          onClick={handleChangeType("like")}
          href="/#"
          className="type-menu__link"
        >
          {icons["like"]}
          Like Buttons
        </a>
        <span>|</span>
        <a
          onClick={handleChangeType("updown")}
          href="/#"
          className="type-menu__link"
        >
          {icons["updown"]}
          Like/Dislike Buttons
        </a>
        <span>|</span>
        <a
          onClick={handleChangeType("clap")}
          href="/#"
          className="type-menu__link"
        >
          {icons["clap"]}
          Clap Buttons
        </a>
      </div>
    );
  };

  return (
    <>
      <h2 className="pane__title">
        {namespace
          ? humanizeString(`${namespace} ${currentType} buttons`)
          : `All ${currentType} buttons`}
      </h2>
      {renderTypeMenu()}
      <Cards buttons={buttons} />
      <Table
        data={buttons}
        autoHeight
        sortColumn="score"
        defaultSortType="desc"
        onSortColumn={handleSort}
      >
        <Column flexGrow={0.15} minWidth={50}>
          <HeaderCell>Type</HeaderCell>
          <IconCell />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Name</HeaderCell>
          <NameCell />
        </Column>

        <Column flexGrow={0.2}>
          <HeaderCell>Total Votes</HeaderCell>
          <Cell dataKey="total_votes" />
        </Column>

        <Column flexGrow={0.25} sortable>
          <HeaderCell>Score</HeaderCell>
          <Cell dataKey="score" />
        </Column>

        <Column flexGrow={0.25}>
          <HeaderCell>Actions</HeaderCell>
          <ActionsCell />
        </Column>
      </Table>
    </>
  );
}
