import { LOG_IN } from "../actionTypes";

const defaultState = {
  username: "",
  first_name: "",
  last_name: "",
  authenticated: false,
  is_rep: false,
  county: 0,
  zip_code: 0,
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
