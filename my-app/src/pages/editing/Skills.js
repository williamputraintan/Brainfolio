import React, { useState, useContext ,useEffect} from 'react';
import { UserContext } from '../../context/user.context';
import AxiosInstance  from "../../utils/axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
      category: "",
      name: "",
      rating:0
    }

    const [fields, setFields] = React.useState(initialState);

    const fieldNames={
      "category":"Category",
      "name":"Description",
      "rating":"Rating"
    }
   
    const [existingTech,setExistingTech] = useState([]);
    const [existingSoft,setExistingSoft] = useState([]);

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    
    function handleSubmit(e){
      e.preventDefault();
      AxiosInstance.post('/edit/skills',{username:state.user,...fields}).then(res=> resetForm());
    }
    function getExistingSkills(){
      AxiosInstance.get("/edit/skills/uname/"+state.user)
      .then(res=> separateType(res.data))
    }

    function resetForm(){
      setFields({ ...initialState });
    }

    function separateType(res){
      var tech=[];
      var soft=[]
      for (var i = 0, len = res.length; i < len; i++) {
        if(res[i].category==="Technical"){
          tech.push(res[i]);
        }else{
          soft.push(res[i]);
        }
      }
      setExistingTech(tech);
      setExistingSoft(soft);
    }

    const myCallback = (dataFromChild) => {
      setFields({
        category: dataFromChild.category,
        name: dataFromChild.name,
        rating: dataFromChild.rating
      })
    }

    useEffect(() => {
      getExistingSkills();
    });

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
                      <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          className={classes.select}
                          name='category'
                          value={fields.category}
                          onChange={onInputChange}
                        >
                          <MenuItem value={'Technical'}>Technical Skill</MenuItem>
                          <MenuItem value={'Soft'}>Soft Skill</MenuItem>
                        </Select>
                          
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