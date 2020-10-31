import { USER_LOG_OFF, 
  SET_USER_LOADING, 
  SET_USER, 
  SET_MODE } from "../constants";
import { setMessage } from "./message.actions";
import AxiosInstance from "../../utils/axios";
import { history } from '../../utils/BrowserHistory';
import Paths from "../../utils/path";
import firebase from '../../utils/firebase';
import {getFirebaseError } from "../../utils/firebaseErrors";


const getImageUrls = async (fileName) => {
  const file = 
    await firebase.storage()
    .ref()
    .child(fileName)
    .getDownloadURL()
  

  return file
}


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
  try{
    if(user){
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      await getUserFromDb(dispatch, idToken)
    }else{
      setUserLoading(dispatch,false)
    }
  }
  catch(e){
    const message = getFirebaseError(e.code);
    console.log("e")
    setMessage(dispatch,message);
    setUserLoading(dispatch, false);
  }
  
}



export const getUserFromDb = async (dispatch, idToken) => {
  console.log("GetUserFromDB", idToken)
  try{
    const response = await AxiosInstance
    .post("/v2/auth/validate",
      {},{
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })

    const { data } = response;
    const { profile } = data;



   

    if(data.username === "" || !data.username){
      setMessage(dispatch, "Sign up almost done!")

      history.push(Paths.SIGN_UP_2);
    }
    console.log(profile)
  
    if(profile.backgroundImage){
      data.profile.backgroundImage = await getImageUrls(profile.backgroundImage);
    }
    if(profile.profileImage){
      data.profile.profileImage = await getImageUrls(profile.profileImage);
    }

    dispatch({
      type:  SET_USER,
      payload: {user: {...data}, token: idToken}
    })  

    

    setUserLoading(dispatch, false);
  }
  catch(e){
    console.log(e)
    setUserLoading(dispatch, false)
  }
 
}


export const signInUser = async (dispatch, email, password) => {
  setUserLoading(dispatch, true)
    /** Trigger on Auth Change 
     * onAuthChange will handle getting user from our Database
     * **/

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async res => {
          if(res){
            const idToken = await firebase.auth().currentUser.getIdToken(true);
            await getUserFromDb(dispatch, idToken);
          }
        })
        .catch(err => {
          console.log(err)
          const message = getFirebaseError(err.code);
          setMessage(dispatch,message);
          setUserLoading(dispatch, false);
        })
    })
}

export const signUpUser = async (dispatch, email, password) => {
  try{
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if(user){
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      console.log(idToken);
      await getUserFromDb(dispatch, idToken);
    }
    setMessage(dispatch,"Successfully signed up!");

    history.push(Paths.SIGN_UP_2);
  }
  catch(e){
    const message = getFirebaseError(e.code);
    setMessage(dispatch,message);
    setUserLoading(dispatch, false);
  }
}


export const setUsername = async (dispatch,username) => {
  setUserLoading(dispatch, true)
  try{
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    const response = await AxiosInstance
      .post("/v2/auth/set/username", 
        {username: username},
        {
          headers: 
          { 'Authorization': `Bearer ${idToken}`}
        })

    const { data } = response;

    dispatch({
      type:  SET_USER,
      payload: {...data, token: idToken}
    })  

    setMessage(dispatch,"Successfully set username!");

    history.push(Paths.SIGN_UP_3);
    setUserLoading(dispatch, false)
  }
  catch(e){
    history.push(Paths.SIGN_UP_2);
    setMessage(dispatch,"Username is already taken!")
    setUserLoading(dispatch, false);
  }
}

export const logUserOff = async (dispatch) => {

  try{
    await firebase.auth().signOut()
    dispatch({
      type: USER_LOG_OFF,
      payload: null
    })
    history.push(Paths.ABOUT_US);
  }catch(e){
    setMessage(dispatch, "Failed to log out!")
    history.push("/404")
  }
}