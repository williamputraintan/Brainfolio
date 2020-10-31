
/** Do no reveal information if user failed to log in with wrong credentials
 * **/
export const getFirebaseError = (code) => {
  switch(code){
    
    case "auth/email-already-exists":
      return "The provided email is already in use by an existing user"
    case "auth/invalid-email":
      return "The provided email is invalid" 
    case "auth/invalid-password":
      return "The provided password  is invalid. It must be a string with at least six characters."
    case "auth/user-not-found":
        return "Authentication failed!"
    case "auth/wrong-password":
      return "Authentication failed!"
    default:
      break;
  }
}