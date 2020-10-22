import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
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
import CircularProgress from '@material-ui/core/CircularProgress';

import CardInfo from './CardInfo.js';
import DoubleTypeInfo from './DoubleTypeInfo';
import {useStyles} from './Styles.js';

export default function Skills(){
    const {state} = useContext(UserContext);
    const classes = useStyles();

    const initialState = {
      category: "Technical",
      name: "",
      rating:0
    }
    
    const fieldNames = {
      "category":"Category",
      "name":"Description",
      "rating":"Rating"
    }

    const [fields, setFields] = React.useState(initialState);
    const [existingTech,setExistingTech] = useState([]);
    const [existingSoft,setExistingSoft] = useState([]);
    const [editId, setEditId] = React.useState(null);
    const [formDisable,setFormDisable]= React.useState(false);

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    
    function validInputs(){
      return (fields.name!="" && fields.rating!=0)
    }
    function handleSubmit(e){
      e.preventDefault();
      
      if(validInputs()){
        //disables form until request complete
        setFormDisable(true);
        // when user edits an entry
        if(editId!=null){
          AxiosInstance.put('edit/skills/'+editId,{...fields}).then(res=> res && isOkay(res.status)? resetForm(): console.log('edit failute'));
        }//when user submits a new entry
        else{
          AxiosInstance.post('/edit/skills',{username:state.user,...fields}).then(res=> res && isOkay(res.status)? resetForm(): console.log("post failure"));
        }
      }else{
        //alert invalid fields here
      }
      
    }
    function isOkay(status){
      return (status>=200 && status<300)
    }

    function getExistingSoftSkills(){
      AxiosInstance.get("/edit/skills/user/soft/"+state.user).then(res=> res? setExistingSoft(res.data):null)
    }

    function getExistingTechSkills(){
      AxiosInstance.get("/edit/skills/user/tech/"+state.user).then(res=> res? setExistingTech(res.data):null)
    }

    function resetForm(){
      setFormDisable(false);
      setFields({ name:"", rating:0});
      setEditId(null);
    }

    //props from children
    const myCallback = (dataFromChild) => {
      setFields({
        category: dataFromChild.category,
        name: dataFromChild.name,
        rating: dataFromChild.rating
      })
      setFormDisable(false)
      setEditId(dataFromChild._id);
    }

    useEffect(() => {
      getExistingSoftSkills();
      getExistingTechSkills();
    });

    return (

          <Container component="main" maxWidth="lg">

            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden mdDown> <CardInfo title={'Soft Skills'} datalist={existingSoft} fieldNames={fieldNames} path={'/edit/skills/'} toEdit={myCallback}/> </Hidden><br/>
              <Hidden mdDown> <CardInfo title={'Technical Skills'} datalist={existingTech} fieldNames={fieldNames} path={'/edit/skills/'} toEdit={myCallback}/> </Hidden>
              <Hidden lgUp>
                <DoubleTypeInfo  
                  title={'Skills'} 
                  type1={"Technical"} type2={"Soft"} 
                  tab1List={existingTech} tab2List={existingSoft} 
                  fieldNames={fieldNames}
                  path={'/edit/skills/'}/></Hidden>
            </Container> 

          <Container component="main" maxWidth="lg" className={classes.formContainer}>
            <div className={classes.paper}>
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