import React from 'react';
import SignIn from './SignInPage.jsx'
import SignUp from './SignUpPage.jsx'
import { Switch,  Route,  useHistory, Redirect } from 'react-router-dom';
import { StoreContext } from '../context/store.context';
import { setUserLoading} from "../context/actions/auth.actions";
import LoadingPage from "../common/PageLoading";
import {signUpSSO} from "../context/actions/auth.actions";

//Libraries
import Paths from "../utils/path";
import firebase from "../utils/firebase.js";

function AuthenticationPage() {
  const history = useHistory();
  const {state, dispatch} = React.useContext(StoreContext);
  const { user } = state;

  React.useEffect(() => {
    setUserLoading(dispatch, true)

    /** We let onAuth Change handle the logic. 
     * This redirect function handles in a redirect event occurred. 
     * If it does not, user will need to signin and set loading to false
     * **/

    firebase.auth().getRedirectResult()
    .then(res => {
      if(res.user != null){
        signUpSSO(dispatch);
        setUserLoading(dispatch, false)
      }else{
        setUserLoading(dispatch, false)
      }
    })
  }, [dispatch,history]);


  return (
    <>
      {state.isLoading && <LoadingPage /> }
      {(state.isLoggedIn && user.isCompleted) && <Redirect to={`${Paths.PORTFOLIO}/${state.user.username}`}/>}
      
      <Switch>
        <Route exact path={Paths.SIGN_IN} component={SignIn}/> 
        <Route path={Paths.SIGN_UP} component={SignUp}/>
      </Switch>
   
    </>
  )
}

export default AuthenticationPage
