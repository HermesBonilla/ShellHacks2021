import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./reducers/user";
import thunk from "redux-thunk";

const allReducers = combineReducers({ user });
const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
