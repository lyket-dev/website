import createAsyncAction from "../utils/createAsyncAction";
import { createReducer } from "redux-act";

import { fetchCurrentUser, updateCurrentUser } from "../api";

export const fetch = createAsyncAction("user/fetch", fetchCurrentUser);

export const update = createAsyncAction("user/update", updateCurrentUser);

export default createReducer(
  {
    [fetch.receive]: (_state, { response }) => response.data,
    [update.receive]: (_state, { response }) => response.data,
  },
  null
);
