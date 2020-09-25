import Axios from 'axios'
import { history } from '../utils/BrowserHistory';

/** Status codes
 *  404 = Not found
 *  401 = unauthorised
 * **/

const URL_PATH = (process.env.NODE_ENV === "development")? 
    "localhost:5000": 
    ""

const axios = Axios.create({
  baseURL: "https://run.mocky.io/v3/b352b65b-939b-4fc1-9b66-82b58cf32366",
})

// Based on HTTP status code automatically 
axios.interceptors.response.use(response => {
  return response
}, 
({response}) => {
  console.log(response);
  switch(response.status){
    case 404: 
      history.push("/404")
      break;
    case 401: 
      history.push("/login")
      break;
    default:
      history.push("/support")
      break;
  }
  
})


export default axios;