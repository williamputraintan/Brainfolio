import React, {Suspense}  from 'react';

// Imports
import { ThemeProvider } from '@material-ui/core/styles';
import { StoreContext } from './context/store.context';
import LoadingPage from "./common/PageLoading";


//Theme
import DarkTheme from "./utils/theme/DarkTheme.js";
import LightTheme from "./utils/theme/MinimalTheme";


import AppInit from "./controllers/AppInit";
import { Switch,  Route, Redirect } from 'react-router-dom';
import Paths from "./utils/path";
import LandingPage from "./pages/Landing";

import DomTreeLoader from "./common/DOMTreeLoading";
import Page404 from "./common/404";

const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));

function App() {
  
  // const {} = React.useContext(UserContext);
  const {state} = React.useContext(StoreContext);
  const darkMode = state.user?.darkMode;

  return (
    <Suspense fallback={<DomTreeLoader/>}>
      <ThemeProvider theme={darkMode? DarkTheme: LightTheme}>
        {state.isLoading && <LoadingPage /> }
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/aboutUs"/>}/>
          <Route path={Paths.APP} component={AppInit}/>
          <Route path={Paths.AUTH} component={AuthenticationPage} />
          <Route path={Paths.ABOUT_US} component={LandingPage}/>
          <Route exact path="/404" component={Page404}/>
        </Switch>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
