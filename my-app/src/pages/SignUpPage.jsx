import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';

import StepperController from "../controllers/StepperController";


// Component Flow
import SignUpForm from "../controllers/SignUpFlow/SignUpForm";
import SignUpNext from "../controllers/SignUpFlow/SignUpNext";

// React-router
import { Switch,  Route, Redirect, useLocation } from 'react-router-dom';
import Paths from '../utils/path';
import SignUpFinal from '../controllers/SignUpFlow/SignUpFinal';



let welcomeImg;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  image: {
    backgroundImage: `url(${welcomeImg})`,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

/**
 * @param {string} pathname 
 */
function getLastPath(pathname){
  
  return pathname.split("/").slice(-1)[0]
}

export default function SignUp() {

  welcomeImg = require("../images/welcome/welcome"+(Math.floor(Math.random() * 5)+1).toString()+".png")
  
  const classes = useStyles();

  const { pathname } = useLocation();


  return (
    <>
    {(getLastPath(pathname) === 'signup') && <Redirect to={Paths.SIGN_UP_1}/>}

      <Grid container component="main" className={classes.root}>
        
        <Slide direction='down' in={true}>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <StepperController />
            <Switch>
              <Route exact path={Paths.SIGN_UP_1} component={SignUpForm}/>
              <Route exact path={Paths.SIGN_UP_2} component={SignUpNext}/>
              <Route exact path={Paths.SIGN_UP_3} component={SignUpFinal}/>
            </Switch>
          </Grid>
        </Slide>

        <Slide in={true} direction='up'>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
        </Slide>
      </Grid>
    </>
  );
}