import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GoogleButton from "../common/GoogleButton"; 
import Copyright from "../common/Copyright";
import Paths from "../utils/path";
import { StoreContext } from '../context/store.context';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';

import { useDebouncedCallback  } from 'use-debounce'
import { setUserLoading, signInUser} from "../context/actions/auth.actions";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2c60a6",
  },
  title:{
    fontSize: 30
  }
}));

function SignInController(props) {

  const classes = useStyles();
  const {dispatch} = React.useContext(StoreContext);
  const history = useHistory();

  const [fields, setFields] = React.useState({
    email: "",
    password: ""
  })


  const debounced = useDebouncedCallback(
    (name,value) => {
      setFields({
        ...fields,
        [name]: value
      });
    },400
  );


  React.useEffect(() => {
  },[fields])


  function onSubmitForm(e){
    e.preventDefault();
    if(fields.email === "" || fields.password === ""){
      return;
    }

    const {email, password} = fields;


    signInUser(dispatch, email, password)
  }


  return (
    <>
    <form className={classes.form} 
      onSubmit={onSubmitForm} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        onChange={(e) => debounced.callback(e.target.name,e.target.value)}
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        onChange={(e) => debounced.callback(e.target.name,e.target.value)}
        id="password"
        autoComplete="current-password"
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
      <GoogleButton/>
      <Grid container>
        <Grid item xs>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to={Paths.SIGN_UP} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>

    </>
  )
}

export default SignInController
