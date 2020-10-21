import React, { useState, useContext ,useEffect} from 'react';
import AxiosInstance  from "../../utils/axios";
import { UserContext } from '../../context/user.context';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Hidden from '@material-ui/core/Hidden';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';

import CardInfo from './CardInfo.js';
import DoubleTypeInfo from './DoubleTypeInfo';
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
    description:""
  }

  const [fields, setFields] = React.useState(initialState);
  const [startDate,setStartDate] =  React.useState(new Date());
  const [endDate,setEndDate] =  React.useState(new Date());
  const [onGoing, setOnGoing] = React.useState(false);

  const [existingWorkData,setExistingWork] = useState([]);
  const [existingVolunteerData,setExistingVolunteer] = useState([]);
  const [editId, setEditId] = React.useState(null);

  const [formDisable,setFormDisable]= React.useState(false);

  function onInputChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  function handleStartDate(date){
    var month = date.getMonth().toString();
    var day = date.getDate().toString();
    if(month.length===1) month="0"+month;
    if(day.length===1) day = "0"+day;

    var formatDate=date.getFullYear()+"-"+month+"-"+day
    setStartDate(formatDate);
  }

  function handleEndDate(date){
    var month = date.getMonth().toString();
    var day = date.getDate().toString();
    if(month.length===1) month="0"+month;
    if(day.length===1) day = "0"+day;
    
    var formatDate=date.getFullYear()+"-"+month+"-"+day;
    setEndDate(formatDate);
  }

  function handleOnGoing(event){
    setOnGoing(event.target.checked);
  };

  function handleSubmit(e){
    e.preventDefault();
    //disables form for request
    setFormDisable(true);
    var finalFields = {
      username:state.user,
      ...fields,
      startDate:startDate, 
      endDate:endDate, 
      onGoing:onGoing
    }
    //when user edits an entry
    if(editId!=null){
      AxiosInstance.put('edit/experience/'+editId,finalFields).then(res=> isOkay(res.status)? resetForm(): console.log("edit failure"));
    }//when user submits a new entry
    else{
      AxiosInstance.post('/edit/experience',finalFields).then(res=> isOkay(res.status)? resetForm(): console.log("post failure"));
    }
  }

  function isOkay(status){
    return (status>=200 && status<300)
  }

  function getWorkExperience(){
    AxiosInstance.get("/edit/experience/user/work/"+state.user)
    .then(res=> setExistingWork(res.data));
  }
  
  async function getVolunteerExperience(){
    AxiosInstance.get("/edit/experience/user/volunteer/"+state.user)
    .then(res=> setExistingVolunteer(res.data));
  }
  function resetForm(){
    setFormDisable(false)
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
    setStartDate(dataFromChild.startDate);
    setEndDate(dataFromChild.endDate);
    setFormDisable(false)
    setEditId(dataFromChild._id);
  }

  useEffect(() => {
    getWorkExperience();
    getVolunteerExperience();
  });
  
    return (
     
          <Container component="main" maxWidth="lg" >
            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden mdDown>
                <CardInfo title={'Work Experience'} datalist={existingWorkData} fieldNames={fieldNames} path={'/edit/education/'} toEdit={myCallback}/> 
              </Hidden><br/>
              <Hidden mdDown>
                <CardInfo title={'Volunteer Experience'} datalist={existingVolunteerData} fieldNames={fieldNames}  path={'edit/experience/'} toEdit={myCallback}/> 
              </Hidden>
              <Hidden lgUp>
                <DoubleTypeInfo  
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
                          <RadioGroup aria-label="type" name="type" value={fields.type} disabled={formDisable} onChange={onInputChange}>
                            <FormControlLabel value="Work" control={<Radio />} label="Work" />
                            <FormControlLabel value="Volunteer" control={<Radio />} label="Volunteer" />
                          </RadioGroup>  
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Company/Organisation Name</div>
                            <TextField
                            disabled={formDisable}
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
                            disabled={formDisable}
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
                            disabled={formDisable}
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
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disabled={formDisable}
                              autoOk
                              id="startDate"
                              variant="inline"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              value={startDate}
                              onChange={date=>handleStartDate(date)}
                            />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> End Date </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disabled={formDisable}
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              id="endDate"
                              value={endDate}
                              onChange={date=>handleEndDate(date)}
                            />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControlLabel 
                            disabled={formDisable}
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
                        disabled={formDisable}
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        color='primary'
                        onClick={event=>handleSubmit(event)}                
                        >
                        Save to my Experience
                        {formDisable?<CircularProgress color="secondary" size={20}/>:null}
                        </Button>
                    </Grid>
                  </form>
                  </div>      
              </Container>
            </Container >
          

    );
  }