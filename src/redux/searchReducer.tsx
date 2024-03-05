import { SEARCH_RESULT } from "./action";

const initialState = {
  search: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULT:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state; // Add default case to return the current state
  }
};

export default searchReducer;
