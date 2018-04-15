import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import reducer from "./ducks/reducer";

export default createStore(
  combineReducers({ reducer }),
  applyMiddleware(promiseMiddleware())
);
