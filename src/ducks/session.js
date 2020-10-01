import createAsyncAction from "../utils/createAsyncAction";
import { createReducer } from "redux-act";

import {
  createSession as create,
  destroySession as destroy,
  fetchSession,
} from "../api";

export const createSession = createAsyncAction("session/create", create);
export const destroySession = createAsyncAction("session/destroy", destroy);
export const fetchCurrentSession = createAsyncAction(
  "session/fetch",
  fetchSession
);

const reducer = createReducer({}, null);

reducer.on(destroySession.receive, (_state) => {
  return null;
});

reducer.on(createSession.receive, (_state, { response }) => {
  return response["data"]["attributes"];
});

reducer.on(fetchCurrentSession.receive, (_state, { response }) => {
  return response["data"]["attributes"];
});

export default reducer;
