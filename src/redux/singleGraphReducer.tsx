import { FILTERED_GRAPHS } from "./action";

interface SingleState {
  filteredGraphs: any[];
}

const initialState: SingleState = {
  filteredGraphs: [],
};

const singleGraphReducer = (
  state: SingleState = initialState,
  action: any
): SingleState => {
  switch (action.type) {
    case FILTERED_GRAPHS:
      return {
        ...state,

        filteredGraphs: action.payload,
      };
    default:
      return state;
  }
};

export default singleGraphReducer;
