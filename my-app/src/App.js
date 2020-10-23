import React from 'react';
import { Switch,  Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AboutUs from './pages/AboutUs.js';
import ProjectPage from './components/project/projectPage'
import Timeline from './pages/Timeline.jsx'
import AuthenticatedRoute from './controllers/AuthenticatedRoute.jsx';

import Portfolio from './pages/portfolio/portfolioPage';


//Pages
import Page404 from "./common/404";
import AuthenticationPage from "./pages/AuthenticationPage";

//Helpers
import firebase from "./utils/firebase.js";
import Paths from "./utils/path.js";

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(90deg, #041e42,#5C788F)',
    minHeight:"100vh",
  },
}));


function App() {
  const classes = useStyles();



  return (
      <>
         
          <Redirect to={Paths.SIGN_IN}/>
          <Switch>
              <Route path="/auth" component={AuthenticationPage} />

              <Route path="/home" component={AuthenticatedRoute}/>

            
              <Route path="/project" component={ProjectPage}/>
              <Route path="/aboutUs" component={AboutUs}/>
              <Route path="/portfolio" component={Portfolio}/>

              {/* the other pages are authenticated already except the project page 'edit/projects' */}
              {/* for unauthenticated project page uncomment below*/}
              {/* <Route exact path="/edit/:page?" component={props => <EditingPage {...props} />} /> */}
             
              <Route exact path="/404" component={Page404}/>
              
              <Route path="/home" component={AuthenticatedRoute}/>
              {/* <Route path="/" component={Timeline} className={classes.root} />  */}
              
          </Switch>
    </>
  );
}

export default App;
