interface GraphState {
  loading: boolean;
  graphs: any[];
}

const initialState: GraphState = {
  loading: false,
  graphs: [],
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

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
