import { combineReducers } from "redux";
import graphReducer from "./graphReducer";

const rootReducer = combineReducers({
  graphs: graphReducer,
});

export default rootReducer;
