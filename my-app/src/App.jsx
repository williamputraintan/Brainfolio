import React, { Suspense, useMemo }  from 'react';
import { Switch,  Route, Redirect, useLocation } from 'react-router-dom';

//Pages
import Page404 from "./common/404";
import NavbarController from "./controllers/NavbarController";

// Imports
import { ThemeProvider } from '@material-ui/core/styles';
import { StoreContext } from './context/store.context';
import DomTreeLoader from "./common/DOMTreeLoading";
import LoadingPage from "./common/PageLoading";

//Theme
import DarkTheme from "./utils/theme/DarkTheme.js";
import LightTheme from "./utils/theme/MinimalTheme";

import AppLoader from "./components/AppLoader/index";
import firebase from './utils/firebase';
import { persistUser,setUserLoading } from "./context/actions/auth.actions";
import MessageSnackbar from "./common/Snackbar";


//Lazy Import
const AboutUs = React.lazy(() => import('./pages/AboutUs.js'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage'));
const ProjectPage = React.lazy(() => import('./pages/ProjectPage.jsx'));
const Portfolio = React.lazy(() => import('./pages/PortfolioPage.jsx'));
const AuthenticatedRoute = React.lazy(() => import('./controllers/AuthenticatedRoute.jsx'));



function App() {
  
  // const {} = React.useContext(UserContext);
  const {state,dispatch} = React.useContext(StoreContext);
  const { darkMode } = state;
  
  React.useEffect(() => {
    setUserLoading(dispatch,true);
    const appAuth = firebase.auth();

    appAuth.onAuthStateChanged(user => {
      persistUser(dispatch, user)
    })


    
  },[])

  return (
      <Suspense fallback={<DomTreeLoader/>}>
        <ThemeProvider theme={darkMode? DarkTheme: LightTheme}>
          {state.isLoading && <LoadingPage /> }
          {/* <MessageSnackbar /> */}
          <AppLoader>
            <NavbarController />
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/aboutUs"/>}/>
                <Route path="/home" component={AuthenticatedRoute} />
                
                {/** Public Routes**/}
                <Route path="/auth" component={AuthenticationPage} />
                <Route path="/project" component={ProjectPage}/>
                <Route path="/aboutUs" component={AboutUs}/>
                
                <Route exact path="/404" component={Page404}/>
                
                {/* <Route path="/" component={Timeline} className={classes.root} />  */}
                
            </Switch>
          </AppLoader>
        </ThemeProvider>
      </Suspense>
   
  );
}

export default App;
