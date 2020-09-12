import React from 'react';
import  {Switch, Route,  BrowserRouter as Router } from 'react-router-dom';

import NavigationBar from './components/NavigationBar.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import AboutUs from './pages/AboutUs.js';
import Portfolio from './pages/portfolio/portfolioPage.js';

function App() {
  return (
    <div className="App">
      
      <Router>
        <NavigationBar/> 
          <Switch>
              <Route path="/signIn" component={SignIn}/> 
              <Route path="/signUp" component={SignUp}/>
              <Route path="/aboutUs" component={AboutUs}/>
              //possibly replacing portfolio path with token or unique id
              <Route path="/portfolio" component={Portfolio}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
