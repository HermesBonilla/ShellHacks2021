export const LOG_IN = "LOG_IN";
export const logIn = (userData) => ({
  type: LOG_IN,
  payload: userData,
});
