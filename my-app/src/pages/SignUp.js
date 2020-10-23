import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
// import { signUserUp } from '../context/actions/auth.actions';


//based on sign up template material ui
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

var WelcomeImg;
const font =  "'Raleway', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  image: {
    backgroundImage: `url(${WelcomeImg})`,
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2c60a6",
    fontFamily: font,
  },
  title:{
    fontFamily: font,
    fontSize: 30
  }
}));

export default function SignUp() {

  const [fields, setFields] = React.useState({
    email: "",
    username:"",
    fullname:"",
    password: ""
  })
  // const {state, dispatch} = React.useContext(UserContext);

  function onSubmitForm(e){
    e.preventDefault();
    console.log(fields);
    if(fields.email === "" || fields.username === "" || fields.fullname === "" || fields.password === ""){
      return;
    }
    //visibility? visibilitylist?
    // let dataa={...fields, visibility:"p", visibilitylist:[""]}
    // console.log('here');
    // signUserUp(dispatch, dataa);
  }

  function onInputChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  WelcomeImg = require("../images/welcome/welcome"+(Math.floor(Math.random() * 5)+1).toString()+".png")
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Slide direction='down' in={true}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography >
                <div className={classes.title}>
                    Sign Up
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
              autoComplete="email"
              onChange={onInputChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={onInputChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="fullname"
              label="Full Name"
              type="full name"
              id="full name"
              onChange={onInputChange}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signIn" variant="body2">
                  {"Already a member? Sign In"}
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
      <Slide in={true} direction='up'>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Slide>
    </Grid>
  );
}