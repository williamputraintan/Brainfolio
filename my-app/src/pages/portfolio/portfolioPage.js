import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, Container } from '@material-ui/core';

import VerticalTabs from './verticalTab.js';

const useStyles = makeStyles((theme) => ({
    profilePicRoot: {
        display: "flex",
        "& > *": {
          margin: theme.spacing(1)
        },
        alignContent: "center",
        justifyContent: "center" ,     
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: "30vh",
      height: "30vh",
    },
    gridRoot:{
      flexGrow: 1,
      
    },
    profileGrid:{
      display: "flex",alignItems: "center", justifyItems: "center",
    }
  }));

export default function Portfolio(){
    const classes = useStyles();
    return(
          <Container className = 'portfolio-container'>
             <Container className = 'portfolio-template'>
              <Grid container useStyles = {classes.gridRoot} >
              <Grid item xs={12} useStyles= {classes.profileGrid}>
                <div className={classes.profilePicRoot}> <Avatar alt="Remy Sharp" src={require('../../images/portfolio-profilepic/arthursetiawan.jpg')} className = {classes.large} /> </div>
              </Grid>
              <Grid item xs={12}>
                <div className = "pt-4 pb-1 ml-4 align-text-center">
                    <h1 style={{fontSize: "6vw", color: "white"}}> John Doe</h1>
                    <h3 style={{fontSize: "2vw", color: "white"}}> Software Engineer at The Company</h3>
                    <h5 style={{fontSize: "1.5vw", color: "white"}}> University of John Does </h5>
                </div>
              </Grid>
              
            </Grid>
            </Container>
            <VerticalTabs/> 
        </Container>
    );
}