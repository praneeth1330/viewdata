// reducers/graphReducer.ts

import { AnyAction } from "redux";

interface GraphState {
  graphs: any[];
}

const initialState: GraphState = {
  graphs: [],
};

const graphReducer = (
  state: GraphState = initialState,
  action: AnyAction
): GraphState => {
  switch (action.type) {
    case "ADD_GRAPHS":
      return {
        ...state,
        graphs: action.payload,
      };
    default:
      return state;
  }
};

export default graphReducer;
