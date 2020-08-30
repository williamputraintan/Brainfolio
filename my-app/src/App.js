import React from 'react';
import  {Switch, Route,  BrowserRouter as Router } from 'react-router-dom';

import SignIn from './pages/SignIn.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/SignIn" component={SignIn}/>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
