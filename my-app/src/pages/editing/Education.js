import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
import AxiosInstance  from "../../utils/axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import CardInfo from './CardInfo.js';
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';

export default function Education() {
    const {state} = useContext(UserContext);
    const classes = useStyles();
    
    const fieldNames = {
      "degree":"Degree",
      "institution":"Institution",
      "location":"Location",
      "score":"Score",
      "startDate":"Start Date",
      "endDate":"End Date"
    }

    const initialState = {
      degree: "",
      institution: "",
      location:"",
      score:""
    }
    
    const [fields, setFields] = React.useState(initialState);
    const [existingData,setExistingData] = useState([]);
    const [editId, setEditId] = React.useState(null);
    const [onGoing, setOnGoing] = React.useState(false);
    const [formDisable,setFormDisable]= React.useState(false);
    const [warning,setWarning] = React.useState(false);

    //date changes
    const [startDate,setStartDate] =  React.useState(new Date(null));
    const [endDate,setEndDate] =  React.useState(new Date(null));

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

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }

    function handleOnGoing(event){
      setOnGoing(event.target.checked);
    };

    function validInputs(){
      return (fields.degree!=="" && fields.institution!=="" && startDate!==new Date(null))
    }
  
    function handleSubmit(e){
      e.preventDefault();
  
      var finalFields=
      {username:state.user,
        ...fields,
        startDate:startDate, 
        endDate:endDate, 
        onGoing:onGoing}

      if(validInputs()===true){
        //disable form for request
        setFormDisable(true);
        //when user edits an existing entry
        if(editId!=null){
          AxiosInstance.put('/edit/education/'+editId,finalFields).then(res=>isOkay(res.status)? resetForm(): console.log("edit failure"));
        }// when user submits a new entry
        else{
          AxiosInstance.post('/edit/education',finalFields).then(res=> isOkay(res.status)? resetForm(): console.log("post failure"));
        }
      }else{
        //alert here incomplete fields
        setWarning(true);
      }
      
    }

    function isOkay(status){
      return (status>=200 && status<300)
    } 

    function getExistingEducation(){
      AxiosInstance.get("/edit/education/user/"+state.user)
      .then(res => setExistingData(res.data))
    }

    function resetForm(){
      setFormDisable(false)
      setFields({ ...initialState });
      setEditId(null);
      setWarning(false);
    }

    //props from children
    const myCallback = (dataFromChild) => {
      setFields({
        degree: dataFromChild.degree,
        institution: dataFromChild.institution,
        location: dataFromChild.location,
        score: dataFromChild.score
      });
      setStartDate(dataFromChild.startDate);
      setEndDate(dataFromChild.endDate);
      setFormDisable(false);
      setEditId(dataFromChild._id);
    }
    
    useEffect(() => {
      getExistingEducation();
    });
  
    return (
     
          <Container component="main" maxWidth="lg" >
            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <CardInfo title={'Education'} datalist={existingData} fieldNames={fieldNames} path={'/edit/education/'} toEdit={myCallback}/> 
              <Hidden lgUp><PopUpInfo  title={'Education'} datalist={existingData} fieldNames={fieldNames} path={'/edit/education/'} toEdit={myCallback}/></Hidden>
            </Container> 

            <Container component="main" maxWidth="lg" className={classes.formContainer}>
                <div className={classes.paper}>
                {warning?<Alert severity="error">Incomplete/Invalid fields input!</Alert>:null}
                  <form className={classes.form} disabled={formDisable} noValidate>
                    <Grid container spacing={3}> 
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}>Degree * </div>
                            <TextField
                            disabled={formDisable}
                            name="degree"
                            variant="outlined"
                            fullWidth
                            value={fields.degree}
                            placeholder="Bachelor of Science (Chemical Systems)"
                            autoFocus
                            onChange={onInputChange}   
                            error = {(fields.degree)===""}  
                            helperText={(fields.degree)!==""?null:"Incomplete entry"}                
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={classes.field}> Institution Name *</div>
                            <TextField
                            disabled={formDisable}
                            name="institution"
                            variant="outlined"
                            fullWidth
                            value={fields.institution}
                            placeholder="University of Melbourne"
                            autoFocus
                            onChange={onInputChange}  
                            error = {(fields.institution)===""}  
                            helperText={(fields.institution)!==""?null:"Incomplete entry"}                 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> Location</div>
                            <TextField
                            disabled={formDisable}
                            variant="outlined"
                            required
                            fullWidth
                            id="location"
                            value={fields.location}
                            placeholder="Melbourne, Australia"
                            name="location"
                            onChange={onInputChange}                      
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> Score </div>
                            <TextField
                            disabled={formDisable}
                            variant="outlined"
                            required
                            fullWidth
                            id="score"
                            placeholder="80%"
                            name="score"
                            value={fields.score}
                            onChange={onInputChange}                   
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.field}> Start Date *</div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              autoOk
                              id="startDate"
                              variant="inline"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              value={startDate}
                              onChange={date=>handleStartDate(date)}
                              error = {(startDate)===null}  
                              helperText={startDate!==null?null:"Incomplete entry"}
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
                              id="endDate"
                              value={endDate}
                              onChange={date=>handleEndDate(date)}
                            />
                            </MuiPickersUtilsProvider>
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
                        Save to my Education     
                        {formDisable?<CircularProgress color="secondary" size={20}/>:null}
                        </Button>
                    </Grid>
                    </Grid>
                  </form>
                  </div>      
              </Container>
            </Container>
    );
  }


