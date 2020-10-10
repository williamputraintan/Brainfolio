import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import CardInfo from './CardInfo.js';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import axios from 'axios';

import { history } from '../../utils/BrowserHistory';

export default function Education() {
    const classes = useStyles();

    //later get data from database
    const fakedata=[{
      degree: "ho",
      institution: "ho",
      location:"ho",
      startDate:"ho",
      endDate:"ho",
      score:"ho"}]

    const fieldNames = ["Degree", "institution", "Course Description", "Start Date","End Date","Score"]

    const [fields, setFields] = React.useState({
      startDate:"",
      endDate:"",
      degree: "",
      institution: "",
      location:"",
      score:""
    })
    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    function handleSubmit(e){
      e.preventDefault();
      //later change to AxiosInstance & portfolioId -> username
      axios.post('http://localhost:5000/edit/education',{portfolioId:'sup',...fields});
    }
  
  
    return (
     
          <Container component="main" maxWidth="lg" >
            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden smDown><CardInfo title={'Education'} datalist={fakedata} fieldNames={fieldNames}/> </Hidden>
              <Hidden mdUp><PopUpInfo  title={'Education'} datalist={fakedata} fieldNames={fieldNames}/></Hidden>
            </Container> 

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
                            placeholder="Bachelor of Science (Chemical Systems)"
                            autoFocus
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Enter your institution name </div>
                            <TextField
                            name="institution"
                            variant="outlined"
                            fullWidth
                            id="institution"
                            placeholder="University of Melbourne"
                            autoFocus
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> Location</div>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="location"
                            placeholder="Melbourne, Australia"
                            name="location"
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> Score </div>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="score"
                            placeholder="80%"
                            name="score"
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
                        Save to my Education
                        </Button>
                    </Grid>
                  </form>
                  </div>      
              </Container>
            </Container >
          

    );
  }