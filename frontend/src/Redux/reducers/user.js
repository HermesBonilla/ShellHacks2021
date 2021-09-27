import { SIGN_PETITION, ADD_PETITION, LOG_IN } from "../actionTypes";

const defaultState = {
  user_name: "",
  first_name: "",
  last_name: "",
  authenticated: false,
  is_representative: false,
  county: 0,
  zip_code: 0,
  created_petitions: [],
  signed_petitions: [],
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        ...action.payload,
        authenticated: action.user_name !== "",
      };
    case ADD_PETITION:
      return {
        ...state,
        created_petitions: [...state.created_petitions, action.payload],
      };
    case SIGN_PETITION:
      return {
        ...state,
        signed_petitions: [...state.signed_petitions, action.payload],
      };
    default:
      return state;
  }
}
