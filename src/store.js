import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import partReducer from "./ducks/partReducer";
import userReducer from "./ducks/userReducer";

export default createStore(
  combineReducers({ partReducer, userReducer }),
  applyMiddleware(promiseMiddleware())
);
