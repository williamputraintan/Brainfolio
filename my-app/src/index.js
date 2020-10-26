import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { history } from "./utils/BrowserHistory"; 
import theme from "./utils/theme/MinimalTheme";

import { UserContextProvider } from './context/user.context';



/** Router History -> ability to pass history to props (Global history) 
 *  Recoil -> global useState, to store user etc...
 *  Check https://recoiljs.org/docs/introduction/getting-started
 *  Cssbaseline -> CSS reset
 * **/
//

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <UserContextProvider>
                
                  <App />
              
              </UserContextProvider>
          </CssBaseline>
        </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
