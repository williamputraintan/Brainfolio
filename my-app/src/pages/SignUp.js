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
import {useForm} from '../hooks/useForm';
import axios from 'axios';

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
  

  WelcomeImg = require("../images/welcome/welcome"+(Math.floor(Math.random() * 5)+1).toString()+".png")
  const classes = useStyles();

  const [form, handleFieldChange] = useForm({
    username: "",
    email: "",
    firstName: "",
    lastName:"",
    password: ""
  });

  async function validateSignup(event){
    event.preventDefault();
    const res = await axios.post('/users/signUp',{
      username:form.username,
      email : form.email,
      firstName:form.firstName,
      lastName: form.lastName,
      password: form.password});
  
  }

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
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={handleFieldChange}
              
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
              autoFocus
              value={form.username}
              onChange={handleFieldChange}
            />
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={form.firstName}
              onChange={handleFieldChange}
            />
            <TextField
              autoComplete="lname"
              name="lastName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoFocus
              value={form.lastName}
              onChange={handleFieldChange}
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
              value={form.password}
              onChange={handleFieldChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event)=>validateSignup(event)}
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