import { STORE_DECODED_TOKEN } from "./action";

interface AccessState {
  decodedToken: any;
}

const initialState: AccessState = {
  decodedToken: {},
};

const accessTokenReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case STORE_DECODED_TOKEN:
      return {
        ...state,
        decodedToken: action.payload,
      };
    default:
      return state;
  }
};

export default accessTokenReducer;
