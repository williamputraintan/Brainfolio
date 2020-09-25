import React from 'react';

import { Switch, Route,  BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import AboutUs from './pages/AboutUs.js';
import NavigationBar from './components/NavigationBar.js'
import ProjectPage from './components/project/projectPage'
import Portfolio from './pages/portfolio/portfolioPage.js';
import Timeline from './pages/Timeline.jsx'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(90deg, #041e42,#5C788F)',
    minHeight:"100vh"
  },
}));


function App() {
  const classes = useStyles();

  return (
      
      <Router>
        <NavigationBar/> 
          <Switch>
            
              <Route path="/signIn" component={SignIn}/> 
              <Route path="/signUp" component={SignUp}/>
              <Route path="/project" component={ProjectPage}/>
              <Route path="/aboutUs" component={AboutUs}/>

              <Route path="/portfolio" component={Portfolio}/>

              <Route path="/" component={Timeline} className={classes.root} /> 
              
          </Switch>
      </Router>

  );
}

export default App;
