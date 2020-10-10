import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Hidden from '@material-ui/core/Hidden';

import { history } from '../../utils/BrowserHistory';
import axios from 'axios';

import CardInfo from './CardInfo.js';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';

  export default function Experience() {
    const classes = useStyles();

    const fakedata=[{
      type: "ho",
      title: "ho",
      companyName:"ho",
      description:"ho",
      startDate:"ho",
      endDate:"ho"}]

    const fieldNames = ["Type", "Job title","Company Name","Job Description", "Start Date", "End Date"]

    const [fields, setFields] = React.useState({
      type: "",
      title: "",
      companyName:"",
      description:"",
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
      console.log(fields);
      //later change to AxiosInstance & portfolioId -> username
      axios.post('http://localhost:5000/edit/experience',{...fields})
    }
  
  
    return (
   
          <Container component="main" maxWidth="lg">

            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden smDown><CardInfo title={'Work Experience'} datalist={fakedata} fieldNames={fieldNames}/> </Hidden><br/>
              <Hidden smDown><CardInfo title={'Volunteer Experience'} datalist={fakedata} fieldNames={fieldNames}/> </Hidden>
              <Hidden mdUp><PopUpInfo  title={'Work Experience'} datalist={fakedata} fieldNames={fieldNames}/></Hidden><br/>
              <Hidden mdUp><PopUpInfo  title={'Volunteer Experience'} datalist={fakedata} fieldNames={fieldNames}/></Hidden>
            </Container> 
      
            <Container component="main" maxWidth="lg" className={classes.formContainer}>
                <div className={classes.paper}>
                  <form className={classes.form} noValidate>

                    <Grid container spacing={3}> 
                        <Grid item xs={12} sm={12}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                              <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              className={classes.select}
                              name='type'
                              value={fields.type}
                              onChange={onInputChange}
                              >
                                <MenuItem value={'work'}>Work</MenuItem>
                                <MenuItem value={'volunteer'}>Volunteer</MenuItem>
                              </Select>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Enter Company name </div>
                            <TextField
                            name="companyName"
                            variant="outlined"
                            fullWidth
                            id="companyName"
                            placeholder="University of Melbourne"
                            autoFocus
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Job title</div>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            placeholder="Tutor for COMP30022"
                            name="title"
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Job description </div>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="description"
                            placeholder="Tutors 2 tutorial classes, each consisting of 20 students and supervising their Capstone Project"
                            name="description"
                            multiline
                            row={4}
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> Start Date </div>
                            <TextField
                              variant="outlined"
                              id="startDate"
                              required
                              fullWidth
                              type="date"
                              name="startDate"
                              defaultValue="2017-05-24"
                              onChange={onInputChange} 
                              
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> End Date </div>
                            <TextField
                              variant="outlined"
                              id="endDate"
                              required
                              fullWidth
                              type="date"
                              name="endDate"
                              defaultValue="2019-05-24"
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