import React, { Suspense }  from 'react';
import { Switch,  Route, Redirect, useLocation } from 'react-router-dom';
import Timeline from './pages/Timeline.jsx'
import EditingPage from './pages/editing/EditingPage'
import DomTreeLoader from "./common/DOMTreeLoading";

//Pages
import Page404 from "./common/404";

//Lazy Import
const AboutUs = React.lazy(() => import('./pages/AboutUs.js'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));
const ProjectPage = React.lazy(() => import('./components/project/projectPage'));
const Portfolio = React.lazy(() => import('./pages/portfolio/new-portfolio.js'));
const AuthenticatedRoute = React.lazy(() => import('./controllers/AuthenticatedRoute.jsx'));



function App() {
  const { match } = useLocation();


  return (
      <Suspense fallback={<DomTreeLoader/>}>
          {/* <Redirect to="/new"/> */}
          <Switch>
              <Route exact path="/" render={() => <Redirect to="/portfolio"/>}/>
              <Route path="/home" component={AuthenticatedRoute} />
              {/** Public Routes**/}
              <Route path="/auth" component={AuthenticationPage} />
              <Route path="/portfolio" component={Portfolio}/>
              <Route path="/project" component={ProjectPage}/>
              <Route path="/aboutUs" component={AboutUs}/>
             
              <Route exact path="/404" component={Page404}/>
              
              {/* <Route path="/" component={Timeline} className={classes.root} />  */}
              
          </Switch>
    </Suspense>
  );
}

export default App;
