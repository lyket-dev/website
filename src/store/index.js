import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../ducks/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
// import logoutOnInvalidAuthHeader from "./middlewares/logoutOnInvalidAuthHeader";

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
    // applyMiddleware(logoutOnInvalidAuthHeader)
  )
);
