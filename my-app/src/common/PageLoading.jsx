import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Spinner from "react-spinkit";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    width: "100%",
    background: "#FFF",
    position: "absolute",
    top:"0",
    left: "0",
    padding: theme.spacing(4),
    background: theme.palette.gradient.background
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
  content: {

  },
  spinner: {
    height: 42,
    width: 42
  }
  
}));

function PageLoading() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.paper} elevation={0}>
        <div classes={classes.content}>
          <Spinner className={classes.spinner} name="folding-cube" color="#EDEDED"/>
        </div>
      </div>
    </section>
  )
}

export default PageLoading;
