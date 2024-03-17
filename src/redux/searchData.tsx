import { SEARCH_DATA } from "./action";
const initialState = {
  data: [],
};

const searchDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_DATA:
      return {
        ...state,
        data: action.payload,
      };
  }
};
export default searchDataReducer;
