import React from "react";
import { useDispatch } from "react-redux";
import { Cell } from "rsuite-table";
import {
  destroy as destroyButton,
  reset as resetButton,
  fetchAll,
} from "ducks/buttons";
import { ReactComponent as Destroy } from "assets/icons/outline/trash.svg";
import { ReactComponent as Reset } from "assets/icons/outline/refresh.svg";
import Tooltip from "components/Tooltip";
import { notice, alert } from "utils/notifications";

export default function ActionsCell({ rowData, ...props }) {
  const dispatch = useDispatch();

  const handleDestroyButton = async (id) => {
    try {
      await dispatch(destroyButton(id));
      notice({ message: "Button destroyed successfully" });
    } catch (error) {
      alert({
        message: `Could not destroy button ${
          error.errors[0] && error.errors[0].message
        }`,
      });
    }
  };

  const handleResetButton = (id) => {
    return dispatch(resetButton(id)).then(() => dispatch(fetchAll()));
  };

  return (
    <Cell {...props}>
      <div className="flex">
        <button className="flex" onClick={() => handleResetButton(rowData.id)}>
          <Tooltip message="Reset counter" id="reset">
            <Reset className="card__icon" />
          </Tooltip>
        </button>
        <button
          className="flex"
          onClick={() => handleDestroyButton(rowData.id)}
        >
          <Tooltip message="Destroy button" id="destroy">
            <Destroy className="card__icon red" />
          </Tooltip>
        </button>
      </div>
    </Cell>
  );
}
