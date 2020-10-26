import { USER_LOG_IN, USER_LOG_OFF, SET_USER_LOADING, SET_USER } from "../reducers/user.reducer";
import AxiosInstance from "../../utils/axios";
import { history } from '../../utils/BrowserHistory';
import Paths from "../../utils/path";
import firebase from '../../utils/firebase';

const path = "/auth"

export const setUserLoading = (dispatch, bool) => {
  dispatch({
    type:  SET_USER_LOADING,
    payload: {isLoading: bool}
  })
}

export const persistUser = async (dispatch, user) =>{
  
  if(user){
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    getUserFromDb(dispatch, idToken)
  }
}

export const getUserFromDb = async (dispatch, idToken) => {

  try{
    const response = await AxiosInstance
    .post("/v2/auth/validate",
      {},{
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })
  


    const { data } = response;


    dispatch({
      type:  SET_USER,
      payload: {user: data, token: idToken}
    })  

    if(data.username === "" || !data.username){
      history.push(Paths.SIGN_UP_2);
    }else{
      history.push(Paths.HOME);
    }

    setUserLoading(dispatch, false)
  }
  catch(e){
    setUserLoading(dispatch, false)
  }
 
}


export const signInUser = async (dispatch, email, password) => {

  const user = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
    });

    console.log(user)
  try{
   
    // const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    if(user){
      const idToken = await firebase.auth().currentUser.getIdToken(true);

      
      getUserFromDb(dispatch, idToken);
    }
  }
  catch(e){
    history.goBack();
    setUserLoading(dispatch, false);
  }
}

export const signUpUser = async (dispatch, email, password) => {
  try{
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(user)
    if(user){
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      console.log(idToken);
      getUserFromDb(dispatch, idToken);
    }
    history.push(Paths.SIGN_UP_2);
  }
  catch(e){
    history.goBack();
    setUserLoading(dispatch, false);
  }
}

export const setUsername = async (dispatch,username) => {
  try{
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    console.log(idToken)

    
    const response = await AxiosInstance
      .post("/v2/auth/set/username", 
        {username: username},
        {
          headers: 
          { 'Authorization': `Bearer ${idToken}`}
        })

    console.log(response)

    const { data } = response;

    dispatch({
      type:  SET_USER,
      payload: {...data, token: idToken}
    })  


    history.push(Paths.SIGN_UP_3);
  }
  catch(e){
    console.log(e)
    setUserLoading(dispatch, false);
  }
}

export const logUserOff = async (dispatch) => {
  await firebase.auth().signOut().then(function() {
    // Sign-out successful.
    dispatch({
      type: USER_LOG_OFF,
      payload: null
    })
  }).catch(function(error) {
    console.log(error)
    history.push("/404")
  });
}


//Pass in dispatch from  Context
// export const logUserIn = (dispatch, fields) => {
//   console.log(fields)
//   AxiosInstance
//     .post(path + "/signin", {
//       ...fields
//     })
//     .then(res => {
//       const token = res.data.accessToken;
//       const user = res.data.username;
      
//       if(token){
//         sessionStorage.setItem("token", token);
//         setTimeout(() => {
//           sessionStorage.removeItem("token")
//         }, 24*3600)

//         dispatch({
//           type: USER_LOG_IN,
//           payload: {token: token, user:user}, 
//         });
//         history.push("/home");
//       }
     
//     })
//     .catch(err => {
//       dispatch({
//         type: USER_LOG_IN,
//         payload: {token: null}
//       })
//     })
// }

// export const signUserUp = (dispatch, fields) => {
//   console.log(fields)
//   AxiosInstance
//     .post(path + "/signup", {
//       ...fields
//     })
//     .then(res => {
//         console.log(res)
//         const token = res.data.accessToken;
        
//         if(token){
//           sessionStorage.setItem("token", token);
//           setTimeout(() => {
//             sessionStorage.removeItem("token")
//           }, 24*3600)
  
//           dispatch({
//             type: USER_LOG_IN,
//             payload: {token: token}
//           })
//           history.push("/home");
//         }
       
//       })
//       .catch(err => {
//         dispatch({
//           type: USER_LOG_IN,
//           payload: {token: null}
//         })
//       })
// }

