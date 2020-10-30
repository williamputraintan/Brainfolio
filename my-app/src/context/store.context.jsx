import React, { useReducer, createContext } from "react";
import userReducer from "./reducers/store.reducer";


const StoreContext = createContext();

const initialState = {
  isLoading: true,
  user:{
    token: null,
    darkMode: true,
  },
  message: {
    content: "",
    show: false
  }
};

function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
export { StoreContext, StoreContextProvider};