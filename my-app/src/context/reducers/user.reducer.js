export const USER_LOG_IN = "USER_LOG_IN";
export const USER_LOG_OFF = "USER_LOG_OFF";

const userReducer = (state, {type, payload}) => {
  switch (type) {
    case USER_LOG_IN:
      return { ...state, token: payload };
    case USER_LOG_OFF: {
      return { ...state, token: null };
    }
    default:
      return state;
  }
} 

export default userReducer;