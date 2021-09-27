export const LOG_IN = "LOG_IN";
export const logIn = (userData) => ({
  type: LOG_IN,
  payload: userData,
});

export const ADD_PETITION = "ADD_PETITION";
export const addPetition = (petition) => ({
  type: ADD_PETITION,
  payload: petition,
});

export const SIGN_PETITION = "SIGN_PETITION";
export const signPetition = (petition) => ({
  type: SIGN_PETITION,
  payload: petition,
});
