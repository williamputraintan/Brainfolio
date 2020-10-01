import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import theme from '../../utils/theme'

const experienceStyles = makeStyles(() => ({
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
      minHeight:250,
      padding:'2%',
      marginBottom:'5%'
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
    select:{
        width:'30%'
    }
  }));
  
  export default function Experience() {
    const classes = experienceStyles();
  
    return (
    <Container component="main" maxWidth="lg" >

      <Container component="main" maxWidth="lg" className={classes.formContainer}>
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={3}> 
                  <Grid item xs={12} sm={12}>
                      
                      <InputLabel id="demo-simple-select-label">Section Title</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.select}
                        // value={age}
                        // onChange={handleChange}
                        >
                        <MenuItem value={'work'}>Work</MenuItem>
                        <MenuItem value={'volunteer'}>Volunteer</MenuItem>
                        </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Enter Company name </div>
                      <TextField
                      name="company"
                      variant="outlined"
                      fullWidth
                      id="company"
                      placeholder="University of Melbourne"
                      autoFocus
                      autoComplete='company'
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Job Title</div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="jobTitle"
                      placeholder="Tutor for COMP30022"
                      name="jobTitle"
                      autoComplete="jobTitle"
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Job Description </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="desc"
                      placeholder="Tutors 2 tutorial classes, each consisting of 20 students and supervising their Capstone Project"
                      name="desc"
                      autoComplete="desc"
                      multiline
                      row={4}
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
                  Save to Experience List
                  </Button>
              </Grid>
            </form>
            </div>      
        </Container>
      <Container component="main" maxWidth="lg" className={classes.listContainer}>
        <Card className={classes.cardRoot}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your Work Experience
            </Typography>
            
            </CardContent>
            </Card>
            <Card className={classes.cardRoot}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your Volunteer Experience
            </Typography>
            
            </CardContent>
            </Card>
      </Container>  
    </Container >

    );
  }