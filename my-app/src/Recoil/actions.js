import AxiosInstance from '../utils/axios';

/** Note on AxiosInstance 
 *  BaseURL already defined
 *  Use this because automatically does redirects if status code is 400-ish. 
 *  All error handling will be standard 
 * **/


/** @param setFunction 
 *  update global state
 * **/
export const logUserIn = setFunction => {
  AxiosInstance
    .get("/")
    .then(response => {
      setFunction({fullname:response, email: "ded"});
    })

 
}