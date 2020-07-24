import createAsyncAction from "../utils/createAsyncAction";
import createEntityReducer from "../utils/createEntityReducer";

import { createSession as create } from "../api";

const addTokenAndSaveSession = async (params) => {
  const response = await create(params);
  sessionStorage.setItem("token", response.data.attributes.auth_token);
  return response;
};

export const createSession = createAsyncAction(
  "session/create",
  addTokenAndSaveSession
);

export default createEntityReducer("session");
