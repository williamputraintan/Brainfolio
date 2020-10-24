import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../context/user.context';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Copyright from "../../common/Copyright";
import GoogleButton from "../../common/GoogleButton"; 
import Paths from "../../utils/path";
import { NavLink as RouterLink } from 'react-router-dom';

import { useDebouncedCallback  } from 'use-debounce';
import { signUpUser, setUserLoading } from "../../context/actions/auth.actions";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    maxWidth: 400
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2c60a6",
  },
  title:{
    fontSize: 30,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#6a97d4",
  },
}));

function SignUpForm() {
  const classes = useStyles();
  const [fields, setFields] = React.useState({
    username:"",
    password: "",
    confirmPassword: ""
  })
  
  const {dispatch} = React.useContext(UserContext);

  function onSubmitForm(e){
    e.preventDefault();
    if(fields.email === "" || fields.password === "" || fields.confirmPassword !== fields.password){
      return;
    }
    setUserLoading(dispatch,true)
    const {email,password} = fields 
    signUpUser(dispatch, email, password)

  }

  const onInputChange = (e) => debounced.callback(e.target.name,e.target.value)
  const debounced = useDebouncedCallback(
    (name,value) => {
      setFields({
        ...fields,
        [name]: value
      });
    },400
  );

  


  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography >
        <div className={classes.title}>
          Sign Up
        </div>
      </Typography>
      

        <form 
          className={classes.form} 
          onSubmit={onSubmitForm} 
          noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onInputChange}
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
            id="password"
            autoComplete="current-password"
            onChange={onInputChange}
          />

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"
            onChange={onInputChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          
          <GoogleButton/>

          <Grid container>
            <Grid item>
              <Link component={RouterLink} to={Paths.SIGN_IN} variant="body2">
                {"Already a member? Sign In"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
    </div>
  )
}

export default SignUpForm
