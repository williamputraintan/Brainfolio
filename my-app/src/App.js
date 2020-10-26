import React, { Suspense, useMemo }  from 'react';
import { Switch,  Route, Redirect, useLocation } from 'react-router-dom';
import Timeline from './pages/Timeline.jsx'
import EditingPage from './pages/editing/EditingPage'
import DomTreeLoader from "./common/DOMTreeLoading";

import NavbarController from "./controllers/NavbarController";

//Pages
import Page404 from "./common/404";

// Imports
import { ThemeProvider } from '@material-ui/core/styles';

//Lazy Import
const AboutUs = React.lazy(() => import('./pages/AboutUs.js'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));
const ProjectPage = React.lazy(() => import('./components/project/projectPage'));
const Portfolio = React.lazy(() => import('./pages/PortfolioPage.jsx'));
const AuthenticatedRoute = React.lazy(() => import('./controllers/AuthenticatedRoute.jsx'));

const newPortfolio = React.lazy(() => import('./pages/portfolio/new-portfolio.js'));


function App() {

  return (
    <>
      {/* <Redirect to="/new"/> */}
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
    </>
  );
}

export default App;
