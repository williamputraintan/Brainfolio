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
import Hidden from '@material-ui/core/Hidden';

import theme from '../../utils/theme';
import { history } from '../../utils/BrowserHistory';

import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';

  export default function Experience() {
    const classes = useStyles();
    const [fields, setFields] = React.useState({
      section: "",
      jobTitle: "",
      jobDesc:"",
      startDate:"",
      endDate:"",
    })
    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    function handleSubmit(e){
      e.preventDefault();
      console.log('button clicked')
      history.push('/edit/experience')
    }
  
  
    return (
    <Container component="main" maxWidth="lg">

      <Container component="main" maxWidth="lg" className={classes.listContainer} >
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
        <Hidden smUp><PopUpInfo title={'Work'}/></Hidden>
        <Hidden smUp><PopUpInfo title={'Volunteer'} /></Hidden>
      </Container>  

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
                        name='section'
                        // value={section}
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
                      onChange={onInputChange}                   
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
                      onChange={onInputChange}                   
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Job Description </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="jobDesc"
                      placeholder="Tutors 2 tutorial classes, each consisting of 20 students and supervising their Capstone Project"
                      name="jobDesc"
                      multiline
                      row={4}
                      onChange={onInputChange}                   
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
                      onChange={onInputChange}                   
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
                      onChange={onInputChange}                   
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
                  onClick={event=>handleSubmit(event)}
                  >
                    Save to my Experiences
                  </Button>
              </Grid>
            </form>
          </div>      
        </Container>
    </Container >

    );
  }