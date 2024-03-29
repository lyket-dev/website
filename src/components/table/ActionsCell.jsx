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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function ActionsCell({ buttonId }) {
  const dispatch = useDispatch();

  const confirmPromise = async ({ title, message }) =>
    new Promise((resolve, _reject) => {
      confirmAlert({
        title: title || "Are you sure you want to proceed?",
        message: message || "Click yes to proceed",
        buttons: [
          {
            label: "Yes",
            onClick: resolve,
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    });

  const handleDestroyButton = async () => {
    try {
      await confirmPromise({
        title: "Are you sure you want to destroy this button?",
      });

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

  const handleResetButton = async () => {
    try {
      await confirmPromise({
        title: "Are you sure you want to reset the counter?",
        message: "This button's counter will be set to 0",
      });
      await dispatch(resetButton(buttonId)).then(() => dispatch(fetchAll()));
      notice({ message: "Button reset successfully" });
    } catch (error) {
      alert({
        message: `Could not reset button ${
          error.errors[0] && error.errors[0].message
        }`,
      });
    }
  };

  return (
    <TableCell align="right" className="table__cell">
      <div className="table__cell__actions">
        <button onClick={handleResetButton}>
          <Tooltip message="Reset counter" id="reset">
            <Reset className="card__icon" />
          </Tooltip>
        </button>
        <button onClick={handleDestroyButton}>
          <Tooltip message="Destroy button" id="destroy">
            <Destroy className="card__icon red" />
          </Tooltip>
        </button>
      </div>
    </TableCell>
  );
}
