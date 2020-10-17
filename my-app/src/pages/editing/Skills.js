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

import CardInfo from './CardInfo.js';
import ExperienceInfo from './ExperienceInfo';
import {useStyles} from './Styles.js';

import { history } from '../../utils/BrowserHistory';

export default function Skills(){
    const {state} = useContext(UserContext);
    const classes = useStyles();

    const initialState = {
      category: "Technical",
      name: "",
      rating:0
    }
    
    const fieldNames={
      "category":"Category",
      "name":"Description",
      "rating":"Rating"
    }

    const [fields, setFields] = React.useState(initialState);

    const [existingTech,setExistingTech] = useState([]);
    const [existingSoft,setExistingSoft] = useState([]);

    const [editId, setEditId] = React.useState(null);

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    
    function handleSubmit(e){
      e.preventDefault();
      // when user edits an entry
      if(editId!=null){
        AxiosInstance.put('edit/skills/'+editId,{...fields}).then(res=> isOkay(res.status)? resetForm(): console.log('edit failute'));
      }//when user submits a new entry
      else{
        AxiosInstance.post('/edit/skills',{username:state.user,...fields}).then(res=> isOkay(res.status)? resetForm(): console.log("post failure"));
      }
    }
    function isOkay(status){
      return (status>=200 && status<300)
    }

    function getExistingSoftSkills(){
      AxiosInstance.get("/edit/skills/uname/soft/"+state.user).then(res=> setExistingSoft(res.data))
    }

    function getExistingTechSkills(){
      AxiosInstance.get("/edit/skills/uname/tech/"+state.user).then(res=> setExistingTech(res.data))
    }

    function resetForm(){
      setFields({ name:"", rating:0});
      setEditId(null);
    }

    const myCallback = (dataFromChild) => {
      setFields({
        category: dataFromChild.category,
        name: dataFromChild.name,
        rating: dataFromChild.rating
      })
      setEditId(dataFromChild._id);
    }

    useEffect(() => {
      getExistingSoftSkills();
      getExistingTechSkills();
    },[{...fields}]);

    return (

          <Container component="main" maxWidth="lg">

            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden mdDown> <CardInfo title={'Soft Skills'} datalist={existingSoft} fieldNames={fieldNames} path={'/edit/skills/'} toEdit={myCallback}/> </Hidden><br/>
              <Hidden mdDown> <CardInfo title={'Technical Skills'} datalist={existingTech} fieldNames={fieldNames} path={'/edit/skills/'} toEdit={myCallback}/> </Hidden>
              <Hidden lgUp>
                <ExperienceInfo  
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
                    <RadioGroup aria-label="category" name="category" value={fields.category} onChange={onInputChange}>
                      <FormControlLabel value="Technical" control={<Radio />} label="Technical" />
                      <FormControlLabel value="Soft" control={<Radio />} label="Soft" />
                    </RadioGroup>      
                  </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className={classes.field}> Enter your Skills</div>
                        <TextField
                        name="name"
                        variant="outlined"
                        fullWidth
                        id="name"
                        placeholder="Cooperative Team member"
                        autoFocus
                        multiline
                        rows={2}
                        value={fields.name}
                        onChange={onInputChange}                   
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Box   borderColor="transparent">
                        <Typography component="legend">Rating</Typography>
                        <Rating
                          name="rating"
                          value={fields.rating}
                          onChange={onInputChange}
                        />
                      </Box>
                    </Grid>
                    <Grid style={{marginLeft:'2%'}} >
                        <Button
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        color='primary'
                        onClick={event=>handleSubmit(event) }
                        >
                        Save to my Skills
                        </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Container>
  
    )
}