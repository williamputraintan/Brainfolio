import React from 'react';
import SignIn from './SignInPage.jsx'
import SignUp from './SignUpPage.jsx'
import { Switch,  Route,  useHistory, Redirect } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import { setUserLoading, setUser , getUserFromDb} from "../context/actions/auth.actions";
import LoadingPage from "../common/PageLoading";


//Libraries
import Paths from "../utils/path";
import firebase from "../utils/firebase.js";

function AuthenticationPage() {
  const history = useHistory();
  const {state, dispatch} = React.useContext(UserContext);

  React.useEffect(() => {
    setUserLoading(dispatch, true)
    if(!state.user){
      firebase.auth().getRedirectResult()
      .then(async res => {

        if(res.user != null){
          const idToken = await firebase.auth().currentUser.getIdToken(true)
          await getUserFromDb(dispatch, idToken)
        }
        firebase.auth().onAuthStateChanged(user => {
          console.log(user)
          setUserLoading(dispatch, false)
        })

      })
      .catch(err => {
        console.log(err)
        setUserLoading(dispatch, false)
        history.push("/404")
      })
    }   
  }, [dispatch,history]);


  return (
    <>
    {state.isLoading && <LoadingPage /> }

      <Switch>
        <Route exact path={Paths.SIGN_IN} component={SignIn}/> 
        <Route path={Paths.SIGN_UP} component={SignUp}/>
      </Switch>
   
    </>
  )
}

export default AuthenticationPage
