import {
  USER_LOG_IN, 
  USER_LOG_OFF, 
  SET_USER_LOADING, 
  SET_USER, 
  SET_MODE,
  SET_MESSAGE,
  END_MESSAGE
} from "../constants";

const storeReducer = (state, {type, payload}) => {
  console.log(state, payload)
  switch (type) {
    case SET_MESSAGE: 
      return {...state, message:{...state.message, content: payload, show: true}}
    
    case END_MESSAGE: 
      return {...state, message:{...state.message, content: null, show: false}}
      
    case USER_LOG_IN:
      return { ...state,  isLoggedIn: true, user: {...payload.user, token: payload} };

    case USER_LOG_OFF: {
      return { ...state, user: {isDarkMode: state.user.darkMode} , isLoggedIn: false};
    }

    case SET_USER_LOADING: {
      return { ...state, isLoading: payload.isLoading };
    }
    
    case SET_USER: {
      return { ...state, user: {...payload.user, token: payload.token }, isLoggedIn: true };
    }

    case SET_MODE:
      return { ...state, user: {...state.user, darkMode: payload}};
      
    default:
      return state;
  }
} 

export default storeReducer;