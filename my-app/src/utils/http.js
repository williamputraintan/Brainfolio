import Axios from "./axios";
import AxiosInstance from "./axios";
import { history } from './BrowserHistory';
import Paths from './path';

export const uploadProfileImages = (formData, idToken) => {
  console.log(formData)
  AxiosInstance
    .post("/v2/auth/set/images",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${idToken}`
      }
    })
    .then(res => {
      history.push(Paths.HOME);
    })

}