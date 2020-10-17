import React, { useState, useContext ,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Hidden from '@material-ui/core/Hidden';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    startDate:"2018-10-15",
    endDate:"2020-10-15"
  }

  const [fields, setFields] = React.useState(initialState)
  const [onGoing, setOnGoing] = React.useState(false);

  const [existingWorkData,setExistingWork] = useState([]);
  const [existingVolunteerData,setExistingVolunteer] = useState([]);
  const [editId, setEditId] = React.useState(null);

  function onInputChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  function handleOnGoing(event){
    setOnGoing(event.target.checked);
  };

  function handleSubmit(e){
    e.preventDefault();
    //when user edits an entry
    if(editId!=null){
      AxiosInstance.put('edit/experience/'+editId,{...fields,onGoing:onGoing}).then(res=> isOkay(res.status)? resetForm(): console.log("edit failure"));
    }//when user submits a new entry
    else{
      AxiosInstance.post('/edit/experience',{username:state.user,...fields,onGoing:onGoing}).then(res=> isOkay(res.status)? resetForm(): console.log("post failure"));
    }
  }

  function isOkay(status){
    return (status>=200 && status<300)
  }

  function getWorkExperience(){
    AxiosInstance.get("/edit/experience/uname/work/"+state.user)
    .then(res=> setExistingWork(res.data));
  }
  
  async function getVolunteerExperience(){
    AxiosInstance.get("/edit/experience/uname/volunteer/"+state.user)
    .then(res=> setExistingVolunteer(res.data));
  }
  function resetForm(){
    setFields({ ...initialState });
    setEditId(null);
  }

  const myCallback = (dataFromChild) => {
    setFields({
      type: dataFromChild.type,
      name: dataFromChild.name,
      title: dataFromChild.title,
      description: dataFromChild.description
    })
    setEditId(dataFromChild._id);
  }

  useEffect(() => {
    getWorkExperience();
    getVolunteerExperience();
  });
  
    return (
     
          <Container component="main" maxWidth="lg" >
            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden mdDown><CardInfo title={'Work Experience'} datalist={existingWorkData} fieldNames={fieldNames} path={'/edit/education/'} toEdit={myCallback}/> </Hidden><br/>
              <Hidden mdDown><CardInfo title={'Volunteer Experience'} datalist={existingVolunteerData} fieldNames={fieldNames}  path={'edit/experience/'} toEdit={myCallback}/> </Hidden>
              <Hidden lgUp>
                <ExperienceInfo  
                  title={'Experiences'} 
                  type1={"Work"} type2={"Volunteer"} 
                  tab1List={existingWorkData} tab2List={existingVolunteerData} 
                  fieldNames={fieldNames}
                  path={'/edit/experience/'}
                  toEdit={myCallback}/></Hidden>
            </Container> 

            <Container component="main" maxWidth="lg" className={classes.formContainer}>
                <div className={classes.paper}>
                  <form className={classes.form} noValidate>
                  <Grid container spacing={3}> 
                        <Grid item xs={12} sm={12}>
                          <RadioGroup aria-label="type" name="type" value={fields.type} onChange={onInputChange}>
                            <FormControlLabel value="Work" control={<Radio />} label="Work" />
                            <FormControlLabel value="Volunteer" control={<Radio />} label="Volunteer" />
                          </RadioGroup>  
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Enter Company name </div>
                            <TextField
                            name="name"
                            variant="outlined"
                            fullWidth
                            id="name"
                            value={fields.name}
                            placeholder="University of Melbourne"                 
                            autoFocus
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Job title</div>
                            <TextField
                            name="title"   
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            value={fields.title}
                            placeholder="Tutor for COMP30022"                          
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Job description </div>
                            <TextField
                            variant="outlined"
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
                              value={fields.startDate}
                              name="startDate"
                              onChange={onInputChange} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> End Date </div>
                            <TextField
                              disabled={onGoing}
                              variant="outlined"
                              id="endDate"
                              required
                              fullWidth
                              type="date"
                              value={fields.endDate}
                              name="endDate"
                              onChange={onInputChange} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={onGoing}
                                onChange={handleOnGoing}
                                color="primary"
                              />
                            }
                            label="On Going"
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
                        Save to my Experience
                        </Button>
                    </Grid>
                  </form>
                  </div>      
              </Container>
            </Container >
          

    );
  }