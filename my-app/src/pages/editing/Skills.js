import React from 'react';

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
import PopUpInfo from './PopUpInfo';
import {useStyles} from './Styles.js';
import axios from 'axios';

import { history } from '../../utils/BrowserHistory';

export default function Skills(){
    const classes = useStyles();
    const fakedata=[{
      tech: "ho",
      soft: "ho"
    }];

    const [fields, setFields] = React.useState({
      category: "",
      name: "",
      rating:4
    })

    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    function handleSubmit(e){
      e.preventDefault();
      //later change to AxiosInstance & portfolioId -> username
      axios.post('http://localhost:5000/edit/skills',{portfolioId:'sup',...fields})
    }
  
    return (

          <Container component="main" maxWidth="lg">

            <Container component="main" maxWidth="lg" className={classes.listContainer}>
              <Hidden smDown> <CardInfo title={'Soft Skills'} datalist={fakedata} fieldNames={null}/> </Hidden><br/>
              <Hidden smDown> <CardInfo title={'Technical Skills'} datalist={fakedata} fieldNames={null}/> </Hidden>
              <Hidden mdUp> <PopUpInfo  title={'Soft Skills'} datalist={fakedata} fieldNames={null}/> </Hidden><br/>
              <Hidden mdUp> <PopUpInfo  title={'Technical Skills'} datalist={fakedata} fieldNames={null}/> </Hidden>
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
                          <MenuItem value={'technical'}>Technical Skill</MenuItem>
                          <MenuItem value={'soft'}>Soft Skill</MenuItem>
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
                        onClick={event=>handleSubmit(event)}
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