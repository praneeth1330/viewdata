interface GraphState {
  loading: boolean;
  graphs: any[];
}

const initialState: GraphState = {
  loading: false,
  graphs: [],
};

const graphsReducer = (
  state: GraphState = initialState,
  action: any
): GraphState => {
  switch (action.type) {
    case "FETCH_GRAPHS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_GRAPHS":
      return {
        ...state,
        loading: false,
        graphs: action.payload,
      };
    case "FETCH_GRAPHS_FAILURE":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default graphsReducer;
