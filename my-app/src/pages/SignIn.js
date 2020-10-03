import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';
import { UserContext } from '../context/user.context';
import { logUserIn } from '../context/actions/auth.actions';

// based on sign in template material ui
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Brainfolio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let welcomeImage = require("../images/welcome/welcome"+(Math.floor(Math.random() * 5)+1).toString()+".png");

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  image: {
    backgroundImage: `url(${welcomeImage})`,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  form: {
    width: '100%', 
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

export default function SignIn(props) {

  const classes = useStyles();

  const [fields, setFields] = React.useState({
    email: "",
    password: ""
  })

  const {state, dispatch} = React.useContext(UserContext);

  function onInputChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  function onSubmitForm(e){
    e.preventDefault();
    if(fields.email === "" || fields.password ===""){
      return;
    }
    logUserIn(dispatch, fields)
  }

  return (
    
    <Grid container component="main" className={classes.root}>
      <Slide in={true} direction='right' >
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Slide>
      <Slide direction='left' in={true} >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography >
                <div className={classes.title}>
                    Sign in
                </div>
          </Typography>
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      </Slide>
    </Grid>
 
  

   
  );
}