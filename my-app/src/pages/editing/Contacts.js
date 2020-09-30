import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import theme from '../../utils/theme'

const contactStyles = makeStyles(() => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
        backgroundColor:theme.palette.primary.main,
        fontFamily:theme.typography.fontFamily,
        margin: theme.spacing(3, 0, 2),
        justifyContent: 'center',
        backgroundColor:'#1D3B64',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
          },
    },
    field:{
        marginBottom:"3%",
        fontWeight:600
        
    }
  }));
  
  export default function SignUp() {
    const classes = contactStyles();
  
    return (
    <Container component="main" maxWidth="lg">
       
        <div className={classes.paper}>
         
          <form className={classes.form} noValidate>
            <Grid container spacing={3}> 
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Title </div>
                    <TextField
                    name="title"
                    variant="outlined"
                    fullWidth
                    id="title"
                    placeholder="Ms"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Full Name </div>
                    <TextField
                    name="fullName"
                    variant="outlined"
                    fullWidth
                    id="name"
                    placeholder="Patricia Angelica"
                    autoFocus
                    autoComplete='name'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Email Address </div>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    placeholder="patriciaangelica@email.com"
                    name="email"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Address </div>
                    <TextField
                    name="address"
                    variant="outlined"
                    fullWidth
                    id="address"
                    placeholder="100 Elizabeth Street"
                    autoFocus
                    autoComplete="address"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Link</div>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="link"
                    placeholder="github.com/yourname"
                    name="link"
                    autoComplete="link"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.field}> Phone Number</div>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNumber"
                    placeholder="(61) 400123123"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    />
                </Grid>
              
            </Grid>
            <Grid  >
                <Button
                type="submit"
                variant="contained"
                className={classes.submit}
                fullWidth
                color='primary'
                >
                Save my details
                </Button>
            </Grid>
          </form>
        </div>
       
      </Container>
    );
  }