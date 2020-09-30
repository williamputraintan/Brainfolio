import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import theme from '../../utils/theme'

const educStyles = makeStyles(() => ({
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
export default function Education(){
    const classes = educStyles();
    
    return (
        <Container component="main" maxWidth="lg">
       
        <div className={classes.paper}>
         
          <form className={classes.form} noValidate>
            <Grid container spacing={3}> 
                
                <Grid item xs={12} sm={8}>
                    <div className={classes.field}> Enter your Degree </div>
                    <TextField
                    name="degree"
                    variant="outlined"
                    fullWidth
                    id="degree"
                    placeholder="Bachelor of Science "
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <div className={classes.field}> Enter university name </div>
                    <TextField
                    name="university"
                    variant="outlined"
                    fullWidth
                    id="university"
                    placeholder="University of Melbourne"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className={classes.field}> Start Date </div>
                    <TextField
                    name="startDate"
                    variant="outlined"
                    fullWidth
                    id="startDate"
                    placeholder="July 2018"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className={classes.field}> Finish Date </div>
                    <TextField
                    name="endDate"
                    variant="outlined"
                    fullWidth
                    id="endDate"
                    placeholder="July 2021"
                    autoFocus
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
                xs={8} sm={4}
                >
                Save my details
                </Button>
            </Grid>
          </form>
        </div>
       
      </Container>
    )
}