import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import theme from '../../utils/theme'

const contactStyles = makeStyles(() => ({
    paper: {
      display: 'inline',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    formContainer:{
      width:'60%', 
      float:'left',
      marginBottom:'3%',
  
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
        
    },
    cardRoot: {
      minWidth: 235,
      minHeight:400,
      padding:'2%'
    },
   
    listContainer:{
      padding:"5%",
      width:'40%',
      float:'right'
    },
    title: {
      fontSize: 18,
      fontFamily: theme.typography.fontFamily,
      colot:"#000",
      fontWeight: 600,
      justifyContent:'center'
    },
  }));
  
  export default function Education() {
    const classes = contactStyles();
  
    return (
    <Container component="main" maxWidth="lg" >

      <Container component="main" maxWidth="lg" className={classes.formContainer}>
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={3}> 
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Enter your Degree </div>
                      <TextField
                      name="degree"
                      variant="outlined"
                      fullWidth
                      id="degree"
                      placeholder="Bachelor of Science"
                      autoFocus
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Enter your University name </div>
                      <TextField
                      name="university"
                      variant="outlined"
                      fullWidth
                      id="university"
                      placeholder="University of Melbourne"
                      autoFocus
                      autoComplete='name'
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Course Description</div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="description"
                      placeholder="Majoring in Chemical Systems"
                      name="email"
                      autoComplete="email"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <div className={classes.field}> Start Date </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="startDate"
                      placeholder="July 2018"
                      name="startDate"
                      autoComplete="startDate"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <div className={classes.field}> End Date </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="endDate"
                      placeholder="July 2021"
                      name="endDate"
                      autoComplete="endDate"
                      />
                  </Grid>
                  
              </Grid>
              <Grid xs={12} sm={12}>
                  <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  fullWidth
                  color='primary'
                  >
                  Save to Education List
                  </Button>
              </Grid>
            </form>
            </div>      
        </Container>
      <Container component="main" maxWidth="lg" className={classes.listContainer}>
        <Card className={classes.cardRoot}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Your Education
          </Typography>
          
        </CardContent>
        </Card>
      </Container>  
    </Container >

    );
  }