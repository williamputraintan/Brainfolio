export const USER_LOG_IN = "USER_LOG_IN";
export const USER_LOG_OFF = "USER_LOG_OFF";
export const SET_USER_LOADING = "SET_USER_LOADING";
export const SET_USER = "SET_USER";

const userReducer = (state, {type, payload}) => {
  switch (type) {
    case USER_LOG_IN:
      return { ...state, token: payload, user:payload.user };
    case USER_LOG_OFF: {
      return { ...state, token: null };
    }
    case SET_USER_LOADING: {
      return { ...state, isLoading: payload.isLoading };
    }
    case SET_USER_LOADING: {
      return { ...state, user: payload };
    }
    case SET_USER: {
      return { ...state, user: payload.user, token: payload.user };
    }
    default:
      return state;
  }
} 

export default userReducer;