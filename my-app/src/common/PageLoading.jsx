import React from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Spinner from "react-spinkit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    width: "100%",
    paddinBottom: "100vh",
    position: "fixed",
    top:"0",
    left: "0",
    padding: theme.spacing(4),
    background: theme.palette.gradient.background,
    zIndex: 999,
    overflow: 'hidden'
  },
  paper: {
    margin: "auto",
    height: "90%",
    width: "90%",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   
  },
  spinner: {
    height: 42,
    width: 42,
    zIndex: 1000,
    
  }
  
}));

function PageLoading() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <section className={classes.root}>
      <div className={classes.paper} elevation={0}>
        <Spinner className={classes.spinner} name="folding-cube" color={theme.palette.background.paper} fadeIn="none"/>
      </div>
    </section>
  )
}

export default React.memo(PageLoading);
