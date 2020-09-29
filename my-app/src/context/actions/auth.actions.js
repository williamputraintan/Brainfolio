import { USER_LOG_IN, USER_LOG_OFF } from "../reducers/user.reducer";
import AxiosInstance from "../../utils/axios";
import { history } from '../../utils/BrowserHistory';

const path = "/auth"

//Pass in dispatch from  Context
export const logUserIn = (dispatch, fields) => {
  console.log(fields)
  AxiosInstance
    .post(path + "/signin", {
      ...fields
    })
    .then(res => {
      const token = res.data.accessToken;
      console.log(res)
      if(token){
        sessionStorage.setItem("token", token);
        setTimeout(() => {
          sessionStorage.removeItem("token")
        }, 24*3600)

        dispatch({
          type: USER_LOG_IN,
          payload: {token: token}
        })
        history.push("/home");
      }
     
    })
    .catch(err => {
      dispatch({
        type: USER_LOG_IN,
        payload: {token: null}
      })
    })
}

export const logUserOff = () => {
  return {
    type: USER_LOG_OFF,
    payload: null
  }
}