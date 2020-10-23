import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IoLogoGoogle } from 'react-icons/io';
import firebase from "../utils/firebase.js";


const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#FFFFFF",
    color: theme.palette.text.secondary,
    textTransform: "none",
    marginBottom: theme.spacing(2)
  }
}));

function GoogleButton(props) {
  const classes = useStyles();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');



  function onGoogleSignIn(e){
    e.preventDefault();
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <Button
        fullWidth
        className={classes.button}
        variant="contained"
        className={classes.button}
        startIcon={<IoLogoGoogle />}
        onClick={onGoogleSignIn}
      >
    Sign In With Google
  </Button>
  )
}

export default GoogleButton
