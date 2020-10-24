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
import Alert from '@material-ui/lab/Alert';

import CardInfo from './CardInfo.js';
import DoubleTypeInfo from './DoubleTypeInfo';
import {useStyles} from './Styles.js';
import {experienceFields} from './FieldNames';

export default function Experience() {
  const {state} = useContext(UserContext);
  const classes = useStyles();

  const initialState={
    type: "Work",
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
  const [warning,setWarning] = React.useState(false);

  function onInputChange(e){
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  function handleStartDate(date){
    setStartDate(date);
  }

  function handleEndDate(date){
    setEndDate(date);
  }

  function handleOnGoing(event){
    setOnGoing(event.target.checked);
  };

  function validInputs(){
    return (fields.type!=="" && fields.name!=="" && fields.title!=="" && fields.description!=="" && startDate!==new Date(null))
  }

  function handleSubmit(e){
    e.preventDefault();
  
    var finalFields = {
      username:state.user,
      ...fields,
      startDate:startDate, 
      endDate:endDate, 
      onGoing:onGoing
    }
    if(validInputs()){
      //disable form for request
      setFormDisable(true);
      //when user edits an entry
      if(editId!=null){
        AxiosInstance.put('/edit/experience/'+editId,finalFields)
        .then(res=> res? resetForm() :null)
        .catch(error=>console.log(error));
      }//when user submits a new entry
      else{
        AxiosInstance.post('/edit/experience',finalFields)
        .then(res=> res? resetForm(): null)
        .catch(error=>console.log(error));
      }
    }else{
      //alert here incomplete fields
      setWarning(true);
    }
    
  }

  function getExistingExperience(){
    AxiosInstance.get("/edit/experience")
    .then(res=> res? separateType(res.data) : null)
    .catch(error=>console.log(error));
  }

  function separateType(res){
      var workData=[];
      var volData=[]
      for (var i = 0, len = res.length; i < len; i++) {
        if(res[i].type==="Work"){
          workData.push(res[i]);
        }else{
          volData.push(res[i]);
        }
      }
      setExistingWork(workData);
      setExistingVolunteer(volData);
  }
 
  function resetForm(){
    setFormDisable(false);
    setFields({ ...initialState });
    setEditId(null);
    setWarning(false);
  }

  //props from children
  const myEditCallback = (idReceived) => {
    setFormDisable(false);
    AxiosInstance.get("/edit/experience/"+idReceived)
    .then(res=> res? 
      setFields(res.data) && 
      setStartDate(new Date(res.data.startDate)) && 
      setEndDate(new Date(res.data.endDate)) && 
      setOnGoing(res.data.onGoing): null)
    .catch(error=>
      console.log(error));
    setEditId(idReceived);
  }

  const myDeleteCallback = (idReceived) => {
    setFormDisable(false);
    AxiosInstance.delete("/edit/experience/"+idReceived)
    .then(res=> res? getExistingExperience(): null)
    .catch(error=>
      console.log(error));
  }

  useEffect(() => {
    getExistingExperience();
  },[formDisable,editId]);
  
    return (
     
          <Container component="main" maxWidth="lg" >
            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden mdDown>
                <CardInfo title={'Work Experience'} datalist={existingWorkData} fieldNames={experienceFields} toEdit={myEditCallback} toDelete={myDeleteCallback}/> 
              </Hidden><br/>
              <Hidden mdDown>
                <CardInfo title={'Volunteer Experience'} datalist={existingVolunteerData} fieldNames={experienceFields} toEdit={myEditCallback} toDelete={myDeleteCallback}/> 
              </Hidden>
              <Hidden lgUp>
                <DoubleTypeInfo  
                  title={'Experiences'} 
                  type1={"Work"} type2={"Volunteer"} 
                  tab1List={existingWorkData} tab2List={existingVolunteerData} 
                  fieldNames={experienceFields}
                  toEdit={myEditCallback} toDelete={myDeleteCallback}/></Hidden>
            </Container> 

            <Container component="main" maxWidth="lg" className={classes.formContainer}>
                <div className={classes.paper}>
                  {warning?<Alert severity="error">Incomplete/Invalid fields input!</Alert>:null}
                  <form className={classes.form} noValidate>
                  <Grid container spacing={3}> 
                        <Grid item xs={12} sm={12}>
                          <div className={classes.field}> Type *</div>
                          <RadioGroup 
                            name="type" 
                            value={fields.type} 
                            error = {(fields.type)===""}  
                            helperText={(fields.type)!==""?null:"Choice Required"} 
                            disabled={formDisable} 
                            onChange={onInputChange}
                          >
                            <FormControlLabel value="Work" control={<Radio />} label="Work" />
                            <FormControlLabel value="Volunteer" control={<Radio />} label="Volunteer" />
                          </RadioGroup>  
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Company Name *</div>
                            <TextField
                            disabled={formDisable}
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            value={fields.name}
                            placeholder="University of Melbourne"                 
                            autoFocus
                            onChange={onInputChange}    
                            error = {(fields.name)===""}  
                            helperText={(fields.name)!==""?null:"Incomplete entry"}                
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Job title *</div>
                            <TextField
                            disabled={formDisable}
                            name="title"   
                            variant="outlined"
                            required
                            fullWidth
                            value={fields.title}
                            placeholder="Tutor for COMP30022"                          
                            onChange={onInputChange}     
                            error = {(fields.title)===""}  
                            helperText={(fields.title)!==""?null:"Incomplete entry"}               
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Job description *</div>
                            <TextField
                            disabled={formDisable}
                            variant="outlined"
                            required
                            fullWidth
                            placeholder="Tutors 2 tutorial classes, each consisting of 20 students and supervising their Capstone Project"
                            name="description"
                            multiline
                            row={4}
                            value={fields.description}
                            onChange={onInputChange}  
                            error = {(fields.description)===""}  
                            helperText={(fields.description)!==""?null:"Incomplete entry"}                  
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> Start Date *</div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              autoOk
                              disabled={formDisable}
                              variant="inline"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              value={startDate}
                              onChange={date=>handleStartDate(date)}
                              error = {startDate===null}  
                              helperText={startDate!==""?null:"Incomplete date"} 
                            />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> End Date </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disabled={onGoing||formDisable}
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
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