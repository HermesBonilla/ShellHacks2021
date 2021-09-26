import { LOG_IN } from "../actionTypes";

const defaultState = {
  user_name: "",
  first_name: "",
  last_name: "",
  authenticated: false,
  is_representative: false,
  county: 0,
  zip_code: 0,
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        ...action.payload,
        authenticated: action.user_name !== "",
      };
    default:
      return state;
  }
}
