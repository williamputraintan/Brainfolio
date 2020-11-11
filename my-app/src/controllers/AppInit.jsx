import React, {useEffect, Suspense} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch,  Route, Redirect, useLocation } from 'react-router-dom';
import { StoreContext } from '../context/store.context';



//Pages

import NavbarController from "../controllers/NavbarController";


import firebase from '../utils/firebase';
import { persistUser,setUserLoading } from "../context/actions/auth.actions";
import MessageSnackbar from "../common/Snackbar";
import Paths from "../utils/path";


//Lazy Import
const ProjectPage = React.lazy(() => import('../pages/ProjectPage.jsx'));
const Portfolio = React.lazy(() => import('../pages/PortfolioPage.jsx'));
const AuthenticatedRoute = React.lazy(() => import('../controllers/AuthenticatedRoute.jsx'));
const EditingPage = React.lazy(() => import('../pages/EditPage.jsx'));
const ProjectDetail =  React.lazy(() => import('../pages/ProjectPage.jsx'));

/** Component to load stuff before rendering UI
 *  App -> Load theme -> AppLoader -> Load user fromDatabase ->...
 *  Also to ensure dark mode is applied before render
 * **/
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(8)
    }
  }
}));

function AppLoader(props) {
  const classes = useStyles(); 

  const {state,dispatch} = React.useContext(StoreContext);
  const { user } = state;
    
  React.useEffect(() => {
    setUserLoading(dispatch,true);
    const appAuth = firebase.auth();

    appAuth.onAuthStateChanged(user => {
      persistUser(dispatch, user)
      console.log(user)
    })
    
  },[user.username])



  return (
      <section className={classes.root}>
        <NavbarController />
            <Switch>
              <Route path={Paths.HOME} component={AuthenticatedRoute} />
              <Route exact path={`${Paths.PORTFOLIO}/:username`} component={Portfolio} />
              <Route path={`${Paths.PROJECT}/:username/:id`} component={ProjectDetail}/>
              {/* <Route path="/allproject" component={AllProjectPage}/> */}
            </Switch>
      </section>

  )
}

export default AppLoader
