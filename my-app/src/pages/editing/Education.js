import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import CardInfo from './CardInfo.js';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';

import { history } from '../../utils/BrowserHistory';

export default function Education() {
    const classes = useStyles();

    const fakedata=[{
      degree: "ho",
      university: "ho",
      courseDesc:"ho",
      startDate:"ho",
      endDate:"ho"}]

    const fieldNames = ["Degree", "University", "Course Description", "Start Date","End Date"]

    const [fields, setFields] = React.useState({
      degree: "",
      university: "",
      courseDesc:"",
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
      history.push('/edit/education')
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
                            placeholder="Bachelor of Science"
                            autoFocus
                            onChange={onInputChange}                   
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
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Course Description</div>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="courseDesc"
                            placeholder="Majoring in Chemical Systems"
                            name="courseDesc"
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
                        Save to my Education
                        </Button>
                    </Grid>
                  </form>
                  </div>      
              </Container>
            </Container >
          

    );
  }