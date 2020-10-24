import React, { Suspense }  from 'react';
import { Switch,  Route, Redirect  } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from './pages/Timeline.jsx'
import AuthenticatedRoute from './controllers/AuthenticatedRoute.jsx';
import EditingPage from './pages/editing/EditingPage'
import DomTreeLoader from "./common/DOMTreeLoading";

//Pages
import Page404 from "./common/404";

//Lazy Import
const AboutUs = React.lazy(() => import('./pages/AboutUs.js'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));
const ProjectPage = React.lazy(() => import('./components/project/projectPage'));
const Portfolio = React.lazy(() => import('./pages/portfolio/portfolioPage'));
const New = React.lazy(() => import('./pages/portfolio/new-portfolio.js'));


const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(90deg, #041e42,#5C788F)',
    minHeight:"100vh",
  },
}));


function App() {
  const classes = useStyles();



  return (
      <Suspense fallback={<DomTreeLoader/>}>
         
          <Switch>
              <Route path="/home" component={DomTreeLoader} />
              <Route path="/auth" component={AuthenticationPage} />

              <Route path="/project" component={ProjectPage}/>
              <Route path="/aboutUs" component={AboutUs}/>
              <Route path="/portfolio" component={Portfolio}/>
              <Route path="/new" component={New}/>

              {/* the other pages are authenticated already except the project page 'edit/projects' */}
              {/* for unauthenticated project page uncomment below*/}
              {/* <Route exact path="/edit/:page?" component={props => <EditingPage {...props} />} /> */}
             
              <Route exact path="/404" component={Page404}/>
              
              <Route path="/home" component={AuthenticatedRoute}/>
              {/* <Route path="/" component={Timeline} className={classes.root} />  */}
              
          </Switch>
    </Suspense>
  );
}

export default App;
