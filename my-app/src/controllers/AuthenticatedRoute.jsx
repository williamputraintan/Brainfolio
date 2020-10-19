import React, {useContext} from 'react';
import { UserContext, } from '../context/user.context';
import { Switch,Route, Redirect, Link } from 'react-router-dom';
import Portfolio from '../pages/portfolio/portfolioPage.js';
import EditingPage from '../pages/editing/EditingPage.js';


function AuthenticatedRoute(props) {
  const {state} = useContext(UserContext);
  return (
    <div>
      {((!state.token) || !(state.user))&& <Redirect to="/signin"/>}
      <h1>User: {state.user}</h1>
      <Link to="/home/portfolio">Portfolio</Link>
      <Link to={"/home/edit/contact/"+state.token.user}>Edit Portfolio</Link>
      <Switch>
        <Route exact path="/home/portfolio" component={Portfolio} />
        <Redirect from={"/home/edit"+state.token.user} to={"/home/edit/contact/"+state.token.user}  />
        <Route path={"/home/edit/:page?/"+state.token.user} component={props => <EditingPage {...props}  />}  />
        
      </Switch>
    </div>
  )
}

export default AuthenticatedRoute
