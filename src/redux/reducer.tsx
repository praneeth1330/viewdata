import { combineReducers } from "redux";
import graphReducer from "./graphReducer";
import singleGraphReducer from "./singleGraphReducer";
import accessTokenReducer from "./accessTokenReducer";

const rootReducer = combineReducers({
  graphs: graphReducer,
  singleGraph: singleGraphReducer,
  auth: accessTokenReducer,
});

export default rootReducer;
