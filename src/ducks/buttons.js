import createAsyncAction from "utils/createAsyncAction";
import createEntityReducer from "utils/createEntityReducer";

import {
  getButtons,
  getButton,
  updateButton,
  createButton,
  destroyButton,
  resetButton,
  bulkUploadButtons,
  tagButton,
  getLikeButtons,
  getClapButtons,
  getUpdownButtons,
} from "../api";

export const fetchAll = createAsyncAction("button/fetchAll", getButtons);

export const fetchAllLikeButtons = createAsyncAction(
  "button/fetchAllLikeButtons",
  getLikeButtons
);
export const fetchAllClapButtons = createAsyncAction(
  "button/fetchAllClapButtons",
  getClapButtons
);
export const fetchAllUpdownButtons = createAsyncAction(
  "button/fetchAllUpdownButtons",
  getUpdownButtons
);

export const fetch = createAsyncAction("button/fetch", getButton);

export const update = createAsyncAction("button/update", updateButton);

export const create = createAsyncAction("button/create", createButton);

export const reset = createAsyncAction("button/reset", resetButton);

export const tag = createAsyncAction("button/tag", tagButton);

export const bulkUpload = createAsyncAction(
  "button/bulkUpload",
  bulkUploadButtons
);

export const destroy = createAsyncAction("button/destroy", destroyButton);

export default createEntityReducer("button", destroy.receive);
