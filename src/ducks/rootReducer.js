import buttons from "./buttons";
import session from "./session";
import currentUser from "./currentUser";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  buttons,
  session,
  currentUser,
});

export default rootReducer;
