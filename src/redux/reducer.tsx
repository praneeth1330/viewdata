import { combineReducers } from "redux";
import graphReducer from "./graphReducer";
import singleGraphReducer from "./singleGraphReducer";
import accessTokenReducer from "./accessTokenReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  graphs: graphReducer,
  singleGraph: singleGraphReducer,
  auth: accessTokenReducer,
  search: searchReducer,
});

export default rootReducer;
