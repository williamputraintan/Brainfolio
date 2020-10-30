import React, { useState, useContext ,useEffect} from 'react';
import { StoreContext } from '../../context/store.context';
import AxiosInstance  from "../../utils/axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import CardInfo from './CardInfo.js';
import DoubleTypeInfo from './DoubleTypeInfo';
import {useStyles} from './Styles.js';
import {skillsFields} from './FieldNames';

import axios from 'axios';

export default function Skills(){
    const {state} = useContext(StoreContext);
    const classes = useStyles();
    const config = {
      headers: { Authorization: `Bearer ${state.token}` }
    };

    const initialState = {
      category: "Technical",
      name: "",
      rating:""
    }

    const [fields, setFields] = React.useState(initialState);
    const [existingTech,setExistingTech] = useState([]);
    const [existingSoft,setExistingSoft] = useState([]);
    const [editId, setEditId] = React.useState(null);
    const [formDisable,setFormDisable]= React.useState(false);
    const [warning,setWarning] = React.useState(false);

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    
    function validInputs(){
      return (fields.name!=="" && fields.rating!=="0")
    }

    function handleSubmit(e){
      e.preventDefault();
      
      var finalFields={ 
        username:state.user.username,
        ...fields}
        console.log(finalFields);

      if(validInputs()===true){
        //disables form until request complete
        setFormDisable(true);
        // when user edits an entry
        if(editId!=null){
          AxiosInstance.put('/edit/skills/'+editId,{...fields},config)
          .then(res=> res? resetForm() : null)
          .catch(error=> console.log(error));
        }//when user submits a new entry
        else{
          AxiosInstance.post('/edit/skills',finalFields,config)
          .then(res=>resetForm())
          .catch(error=>console.log(error));
        }
      }else{
        setWarning(true);
      }
    }

    function getExistingSkills(){
      AxiosInstance.get("/edit/skills/",config)
      .then(res=> res? separateType(res.data): null)
      .catch(error=>console.log(error))
    }

    function separateType(res){
      var softData=[];
      var techData=[]
      for (var i = 0, len = res.length; i < len; i++) {
        if(res[i].category==="Soft"){
          softData.push(res[i]);
        }else{
          techData.push(res[i]);
        }
      }
      setExistingSoft(softData);
      setExistingTech(techData);
  }
 

    function resetForm(){
      setFormDisable(false);
      setFields({ name:"", rating:0});
      setEditId(null);
      setWarning(false);
    }

    const myEditCallback = (idReceived) => {
      setFormDisable(false);
      AxiosInstance.get("/edit/skills/"+idReceived,config)
      .then(res=> res? 
        setFields(res.data) : null)
      .catch(error=>
        console.log(error));
      setEditId(idReceived);
    }

    const myDeleteCallback = (idReceived) => {
      setFormDisable(false);
      AxiosInstance.delete("/edit/skills/"+idReceived,config)
      .then(res=> res? getExistingSkills(): null)
      .catch(error=>
        console.log(error));
    }

    useEffect(() => {
     getExistingSkills();
    },[formDisable,editId]);

    return (

          <Container component="main" maxWidth="lg">

            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden mdDown> <CardInfo title={'Soft Skills'} datalist={existingSoft} fieldNames={skillsFields} toEdit={myEditCallback} toDelete={myDeleteCallback}/> </Hidden><br/>
              <Hidden mdDown> <CardInfo title={'Technical Skills'} datalist={existingTech} fieldNames={skillsFields} toEdit={myEditCallback} toDelete={myDeleteCallback}/> </Hidden>
              <Hidden lgUp>
                <DoubleTypeInfo  
                  title={'Skills'} 
                  type1={"Technical"} type2={"Soft"} 
                  tab1List={existingTech} tab2List={existingSoft} 
                  fieldNames={skillsFields}
                  path={'/edit/skills/'}
                  toEdit={myEditCallback} toDelete={myDeleteCallback}/></Hidden>
            </Container> 

          <Container component="main" maxWidth="lg" className={classes.formContainer}>
            <div className={classes.paper}>
              {warning?<Alert severity="error">Incomplete/Invalid fields input!</Alert>:null}
              <form className={classes.form} noValidate>
                <Grid container spacing={3}> 
                  <Grid item xs={12} sm={12}>
                    <div className={classes.field}> Category *</div>
                    <RadioGroup 
                      name="category" 
                      error = {(fields.category)===""}  
                      helperText={(fields.category)!==""?null:"Choice Required"}  
                      disabled={formDisable} 
                      value={fields.category} 
                      onChange={onInputChange}
                      >
                        <FormControlLabel value="Technical" control={<Radio />} label="Technical" />
                        <FormControlLabel value="Soft" control={<Radio />} label="Soft" />
                    </RadioGroup>      
                  </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className={classes.field}> Enter your Skill *</div>
                        <TextField
                        disabled={formDisable}
                        name="name"
                        variant="outlined"
                        fullWidth
                        placeholder="Cooperative Team member"
                        autoFocus
                        multiline
                        rows={2}
                        value={fields.name}
                        onChange={onInputChange}    
                        error = {(fields.name)===""}  
                        helperText={(fields.name)!==""?null:"Incomplete entry"}                
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Box borderColor="transparent">
                        <Typography component="legend">Rating *</Typography>
                        <Rating
                          disabled={formDisable}
                          name="rating"
                          value={fields.rating}
                          onChange={onInputChange}
                          error = {(fields.rating)===0}  
                          helperText={(fields.rating)!==0?null:"Incomplete entry"} 
                        />
                      </Box>
                    </Grid>
                    <Grid style={{marginLeft:'2%'}} >
                        <Button
                        disabled={formDisable}
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        color='primary'
                        onClick={event=>handleSubmit(event) }
                        >
                        Save to my Skills
                        {formDisable?<CircularProgress color="secondary" size={20}/>:null}
                        </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Container>
  
    )
}