import React from "react";
import { useDispatch } from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import {
  destroy as destroyButton,
  reset as resetButton,
  fetchAll,
} from "ducks/buttons";
import { ReactComponent as Destroy } from "assets/icons/outline/trash.svg";
import { ReactComponent as Reset } from "assets/icons/outline/rewind.svg";
import Tooltip from "components/Tooltip";
import { notice, alert } from "utils/notifications";

export default function ActionsCell({ buttonId }) {
  const dispatch = useDispatch();

  const handleDestroyButton = async () => {
    try {
      await dispatch(destroyButton(buttonId));
      notice({ message: "Button destroyed successfully" });
    } catch (error) {
      alert({
        message: `Could not destroy button ${
          error.errors[0] && error.errors[0].message
        }`,
      });
    }
  };

  const handleResetButton = () => {
    return dispatch(resetButton(buttonId)).then(() => dispatch(fetchAll()));
  };

  return (
    <TableCell align="right" className="table__cell">
      <div className="flex">
        <button className="flex" onClick={handleResetButton}>
          <Tooltip message="Reset counter" id="reset">
            <Reset className="card__icon" />
          </Tooltip>
        </button>
        <button className="flex" onClick={handleDestroyButton}>
          <Tooltip message="Destroy button" id="destroy">
            <Destroy className="card__icon red" />
          </Tooltip>
        </button>
      </div>
    </TableCell>
  );
}
