import React, {useContext} from 'react';
import { UserContext, } from '../context/user.context';
import { Switch,Route, Redirect, Link } from 'react-router-dom';
import Portfolio from '../pages/portfolio/portfolioPage.js';


function AuthenticatedRoute(props) {
  const {state} = useContext(UserContext);

  return (
    <div>
      {(!state.token) && <Redirect to="/signin"/>}
      <h1>User: {state.user}</h1>
      <Link to="/home/portfolio">Portfolio</Link>
      <Switch>
        <Route exact path="/home/portfolio" component={Portfolio}/>
      </Switch>
    </div>
  )
}

export default AuthenticatedRoute
