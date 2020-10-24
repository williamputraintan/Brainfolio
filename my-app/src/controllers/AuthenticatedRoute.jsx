import React, {useContext} from 'react';
import { UserContext, } from '../context/user.context';
import { Switch,Route, Redirect, Link } from 'react-router-dom';
import Portfolio from '../pages/portfolio/portfolioPage.js';
import EditingPage from '../pages/editing/EditingPage.js';
import Paths from "../utils/path";


function AuthenticatedRoute(props) {
  const {state} = useContext(UserContext);
  const { username } = state.user

  console.log(state)

  return (
    <div>

      {
        state.user ?
        <>
           <Link to="/home/portfolio">Portfolio</Link>
            <Link to={"/home/edit/contact/"+username}>Edit Portfolio</Link>

            <Switch>


              <Route exact path="/home/portfolio" component={Portfolio} />
              <Redirect from={"/home/edit"+state.token.user} to={"/home/edit/contact/"+state.token.user}  />
              <Route path={"/home/edit/:page?/:username"+state.token.user} component={props => <EditingPage {...props}  />}  />

            </Switch>
        </>
          : 
        <Redirect to={Paths.SIGN_IN}/>
      }


      {/* {((!state.token) || !(state.user)) && <Redirect to="/signin"/>} */}

      {/* <h1>User: {state.user}</h1> */}
     
    </div>
  )
}

export default AuthenticatedRoute
