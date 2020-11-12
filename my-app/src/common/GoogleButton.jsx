import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IoLogoGoogle } from 'react-icons/io';
import firebase from "../utils/firebase.js";
import { StoreContext } from '../context/store.context';
import { setUserLoading} from "../context/actions/auth.actions";


const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    textTransform: "none",
    marginBottom: theme.spacing(2)
  }
}));

function GoogleButton(props) {
  const classes = useStyles();

  const {dispatch} = React.useContext(StoreContext);

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  

  function onGoogleSignIn(e){
    e.preventDefault();
    setUserLoading(dispatch,true);
    console.log('google signin bugged1')
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      console.log('google signin bugged2')
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
    });
  }

  return (
    <Button
        fullWidth
        className={classes.button}
        variant="contained"
        startIcon={<IoLogoGoogle />}
        onClick={onGoogleSignIn}
      >
    Sign In With Google
  </Button>
  )
}

export default GoogleButton
