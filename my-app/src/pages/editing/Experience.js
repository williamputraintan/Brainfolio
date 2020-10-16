import React, { useState, useContext ,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Hidden from '@material-ui/core/Hidden';

import { history } from '../../utils/BrowserHistory';
import AxiosInstance  from "../../utils/axios";
import { UserContext } from '../../context/user.context';

import CardInfo from './CardInfo.js';
import ExperienceInfo from './ExperienceInfo';
import {useStyles} from './Styles.js';

  export default function Experience() {
    const {state} = useContext(UserContext);
    const classes = useStyles();

    const fieldNames={
      "type":"Type",
      "name":"Company Name",
      "title":"Job title",
      "description":"Job Description",
      "startDate":"Start Date",
      "endDate":"End Date"
    }

    const initialState={
      type: "",
      name:"",
      title: "",
      description:"",
      startDate:"",
      endDate:"",
    }

    const [fields, setFields] = React.useState(initialState)

    const [existingWorkData,setExistingWork] = useState([]);
    const [existingVolunteerData,setExistingVolunteer] = useState([]);

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
 
    function handleSubmit(e){
      e.preventDefault();
      AxiosInstance.post('/edit/experience',{username:state.user,...fields}).then(res=> resetForm());
    }

    function getExistingExperience(){
      AxiosInstance.get("/edit/experience/"+state.user)
      .then(res=> separateType(res.data));
    }

    function resetForm(){
      setFields({ ...initialState });
    }

    function separateType(res){
      var workRes=[];
      var volRes=[]
      for (var i = 0, len = res.length; i < len; i++) {
        if(res[i].type==="Work"){
          workRes.push(res[i]);
        }else{
          volRes.push(res[i]);
        }
      }
      setExistingWork(workRes);
      setExistingVolunteer(volRes);
    }

    useEffect(() => {
      getExistingExperience();
    });
  
    return (
   
          <Container component="main" maxWidth="lg">

            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden mdDown><CardInfo title={'Work Experience'} datalist={existingWorkData} fieldNames={fieldNames}  path={'edit/experience/'}/> </Hidden><br/>
              <Hidden mdDown><CardInfo title={'Volunteer Experience'} datalist={existingVolunteerData} fieldNames={fieldNames}  path={'edit/experience/'}/> </Hidden>
              <Hidden lgUp>
                <ExperienceInfo  
                  title={'Experiences'} 
                  type1={"Work"} type2={"Volunteer"} 
                  tab1List={existingWorkData} tab2List={existingVolunteerData} 
                  fieldNames={fieldNames}
                  path={'/edit/experience/'}/></Hidden>
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
                                <MenuItem value={'Work'}>Work</MenuItem>
                                <MenuItem value={'Volunteer'}>Volunteer</MenuItem>
                              </Select>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Enter Company name </div>
                            <TextField
                            name="name"
                            variant="outlined"
                            fullWidth
                            id="name"
                            placeholder="University of Melbourne"
                            autoFocus
                            value={fields.name}
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
                            value={fields.title}
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
                            value={fields.description}
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
                              value={fields.startDate}
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
                              value={fields.endDate}
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