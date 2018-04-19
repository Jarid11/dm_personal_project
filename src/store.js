import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import partReducer from "./ducks/partReducer";
import userReducer from "./ducks/userReducer";
import cartReducer from "./ducks/cartReducer";

export default createStore(
  combineReducers({ partReducer, userReducer, cartReducer }),
  applyMiddleware(promiseMiddleware())
);
