import React from 'react';
import  {Switch, Route,  BrowserRouter as Router } from 'react-router-dom';

import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import NavigationBar from './components/NavigationBar.js'

import Timeline from './pages/Timeline/Timeline.jsx'

function App() {
  return (
    <div className="App">
      
      <Router>
        <NavigationBar/> 
          <Switch>
            
              <Route path="/signIn" component={SignIn}/> 
              <Route path="/signUp" component={SignUp}/>

              <Route path="/" component={Timeline}/> 
          </Switch>
      </Router>
    </div>
  );
}

export default App;
