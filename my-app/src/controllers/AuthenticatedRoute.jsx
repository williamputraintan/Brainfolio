import React, {useContext} from 'react';
import { StoreContext, } from '../context/store.context';
import { Switch,Route, Redirect, Link } from 'react-router-dom';
import Paths from "../utils/path";

//Pages
import PortfolioPage from "../pages/PortfolioPage";
import EditPage from "../pages/EditPage";
import EditingPage from '../pages/editing/EditingPage.js';

import firebase from "../utils/firebase.js";


function AuthenticatedRoute() {
  const {state} = useContext(StoreContext);
  const username = state.user.username;


  console.log(state.user)

  React.useEffect(() => {
    
  },[username])

 
    
  return (
    <div>

      {
        state.user ?
        <>
            <Link to="/home/portfolio">Portfolio</Link>
            <Link to={"/home/edit/contact/"}>Edit Portfolio</Link>

            {/* <Redirect from={"/home/edit"+state.user} to={"/home/edit/contact/"+state.user}  /> */}

            <Switch>
              <Route exact path={`${Paths.PORTFOLIO}/:username`} component={PortfolioPage} />
              <Route path={`${Paths.EDIT_PORTFOLIO}/:username/`} component={EditPage} />
              {/* <Route path={"/home/edit/"} component={EditPage}/> */}
              {/* <Route path={"/home/edit/:page?/:username"} component={props => <EditingPage {...props}  />}  /> */}
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
