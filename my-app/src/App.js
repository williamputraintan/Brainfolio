import React from 'react';
import { Switch,  Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import AboutUs from './pages/AboutUs.js';
import Navbar from './components/Navbar';
import ProjectPage from './components/project/projectPage'
import Timeline from './pages/Timeline.jsx'
import EditingPage from './pages/editing/EditingPage.js';

import AuthenticatedRoute from './controllers/AuthenticatedRoute.jsx';

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

          
              <Route path="/edit" component={EditingPage}/>              
        
              <Route path="/home" component={AuthenticatedRoute}/>


              <Route path="/" component={Timeline} className={classes.root} /> 
              
          </Switch>
    </>
  );
}

export default App;
