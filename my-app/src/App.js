import React from 'react';
import { Switch,  Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import AboutUs from './pages/AboutUs.js';
import Navbar from './components/Navbar';
import ProjectPage from './components/project/projectPage'
import Timeline from './pages/Timeline.jsx'
import AuthenticatedRoute from './controllers/AuthenticatedRoute.jsx';
import EditingPage from './pages/editing/EditingPage'

import Portfolio from './pages/portfolio/portfolioPage';
import New from './pages/portfolio/new-portfolio.js';

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
          <Navbar/>
  
          <Switch>
            
              <Route path="/signIn" component={SignIn}/> 
              <Route path="/signUp" component={SignUp}/>
              <Route path="/project" component={ProjectPage}/>
              <Route path="/aboutUs" component={AboutUs}/>
              <Route path="/portfolio" component={Portfolio}/>
              <Route path="/new" component={New}/>

              {/* the other pages are authenticated already except the project page 'edit/projects' */}
              {/* for unauthenticated project page uncomment below*/}
              <Route exact path="/edit/:page?" component={props => <EditingPage {...props} />} />
             
           
              <Route path="/home" component={AuthenticatedRoute}/>
              <Route path="/" component={Timeline} className={classes.root} /> 
              
          </Switch>
    </>
  );
}

export default App;
