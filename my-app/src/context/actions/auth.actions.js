import { USER_LOG_IN, USER_LOG_OFF, SET_USER_LOADING, SET_USER, SET_MODE } from "../reducers/user.reducer";
import AxiosInstance from "../../utils/axios";
import { history } from '../../utils/BrowserHistory';
import Paths from "../../utils/path";
import firebase from '../../utils/firebase';

const path = "/auth"


export const setDarkMode = (dispatch, bool) => {
  dispatch({
    type:  SET_MODE,
    payload: bool
  })
}

export const setUserLoading = (dispatch, bool) => {
  dispatch({
    type:  SET_USER_LOADING,
    payload: {isLoading: bool}
  })
}

export const persistUser = async (dispatch, user) =>{
  setUserLoading(dispatch,true);
  console.log(user)
  if(user){
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    await getUserFromDb(dispatch, idToken)
  }else{
    setUserLoading(dispatch,false)
  }
}

export const getUserFromDb = async (dispatch, idToken) => {
  console.log(idToken)
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
      history.push(`${Paths.PORTFOLIO}/${data.username}`);
    }

    setUserLoading(dispatch, false)
  }
  catch(e){
    setUserLoading(dispatch, false)
  }
 
}


export const signInUser = async (dispatch, email, password) => {
  setUserLoading(dispatch, true)
    /** Trigger on Auth Change 
     * onAuthChange will handle getting user from our Database
     * **/

  try{
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => firebase.auth().signInWithEmailAndPassword(email, password));
    
    // if(instance){
    //   // const idToken = await firebase.auth().currentUser.getIdToken(true);
    //   console.log(instance)
    // }

    // // const user = await instance.auth().signInWithEmailAndPassword(email,password);
    
    // // if(user){
    // //   const idToken = await firebase.auth().currentUser.getIdToken(true);

    // //   console.log(idToken)
    // //   // await getUserFromDb(dispatch, idToken);
    // // }
  }
  catch(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode,errorMessage)
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

