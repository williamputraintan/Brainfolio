import Axios from 'axios'
import { history } from '../utils/BrowserHistory';

/** Status codes
 *  404 = Not found
 *  401 = unauthorised
 * **/

// const URL_PATH = (process.env.NODE_ENV === "development")? 
//     "localhost:5000": 
//     ""

const URL_PATH = "https://testdockerprod123.herokuapp.com/"
// const URL_PATH = "http://localhost:5000/"

const axios = Axios.create({
  baseURL: URL_PATH,
})

// Based on HTTP status code automatically 
axios.interceptors.response.use(response => {
  return response
}, 
({response}) => {
  console.log(response)
  if(Axios.isCancel()){
    return;
  }
  console.log(response);
  if(response.status){
    switch(response.status){
      case 404: 
        history.push("/404")
        break;
      case 401:
        history.push("/auth/signin")
        break;
      case 400: 
        history.goBack()
        break;
      default:
        history.push("/404")
        break;
    }
  }else{
    history.push("/404")
  }

})


export default axios;