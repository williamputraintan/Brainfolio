import React, { Suspense, useMemo }  from 'react';
import { Switch,  Route, Redirect, useLocation } from 'react-router-dom';

import NavbarController from "./controllers/NavbarController";

//Pages
import Page404 from "./common/404";

// Imports
import { ThemeProvider } from '@material-ui/core/styles';
import { UserContext } from './context/user.context';
import firebase from './utils/firebase';
import { persistUser,setUserLoading } from "./context/actions/auth.actions";
import DomTreeLoader from "./common/DOMTreeLoading";

//Lazy Import
const AboutUs = React.lazy(() => import('./pages/AboutUs.jsx'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));
const ProjectPage = React.lazy(() => import('./pages/ProjectPage.jsx'));
const Portfolio = React.lazy(() => import('./pages/PortfolioPage.jsx'));
const AuthenticatedRoute = React.lazy(() => import('./controllers/AuthenticatedRoute.jsx'));

const newPortfolio = React.lazy(() => import('./pages/portfolio/new-portfolio.js'));



function App() {

  const {state, dispatch} = React.useContext(UserContext);
  
 
  React.useEffect(() => {
    setUserLoading(dispatch, true)
    firebase.auth().onAuthStateChanged(function(user) {
      persistUser(dispatch, user)
    });
  }, [])

 

  return (
    <Suspense fallback={<DomTreeLoader/>}>
      
      <NavbarController />
      <Switch>
          <Route exact path="/" render={() => <Redirect to="/aboutUs"/>}/>
          <Route path="/home" component={AuthenticatedRoute} />
          
          {/** Public Routes**/}
          <Route path="/auth" component={AuthenticationPage} />
          <Route path="/portfolio/:username" component={Portfolio}/>
          <Route path="/new/portfolio" component={newPortfolio}/>
          <Route path="/project" component={ProjectPage}/>
          <Route path="/aboutUs" component={AboutUs}/>
          
          <Route exact path="/404" component={Page404}/>
          
          {/* <Route path="/" component={Timeline} className={classes.root} />  */}
          
      </Switch>
    </Suspense>
  );
}

export default App;
