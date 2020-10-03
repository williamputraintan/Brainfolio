import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { history } from '../../utils/BrowserHistory';

import theme from '../../utils/theme'

const projectStyles = makeStyles(() => ({
    paper: {
      display: 'inline',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    formContainer:{
      width:'60%', 
      float:'left',
      marginBottom:'3%',
  
    },
    submit: {
        backgroundColor:theme.palette.primary.main,
        fontFamily:theme.typography.fontFamily,
        margin: theme.spacing(3, 0, 2),
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
          },
    },
    field:{
        marginBottom:"3%",
        fontWeight:600
        
    },
    cardRoot: {
        minWidth: 235,
        minHeight:400,
        padding:'2%',
        marginBottom:'5%'
    },
   
    listContainer:{
      padding:"5%",
      width:'40%',
      float:'right'
    },
    title: {
      fontSize: 18,
      fontFamily: theme.typography.fontFamily,
      colot:"#000",
      fontWeight: 600,
      justifyContent:'center'
    },
    select:{
        width:'30%',
        height:'40px',
        marginRight:'10%'
    },
    contributor:{
    
        width:'48%'
    },
    input: {
        display: 'none',
      },
  }));
  
  export default function Projects() {
    const classes = projectStyles();
    const [fields, setFields] = React.useState({
      visibility: "",
      projectTitle: "",
      startDate:"",
      endDate:"",
      // contributers here
    })
    function onInputChange(e){
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    }
    function handleSubmit(e){
      e.preventDefault();
      console.log('button clicked')
      history.push('/edit/projects')
    }
  
    return (
    <Container component="main" maxWidth="lg" >

      <Container component="main" maxWidth="lg" className={classes.formContainer}>
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={3}> 
                  <Grid item xs={12} sm={12}>
                      
                      <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.select}
                    
                        // value={age}
                        // onChange={handleChange}
                        >
                        <MenuItem value={'public'}>Public</MenuItem>
                        <MenuItem value={'semiPrivate'}>Semi-Private</MenuItem>
                        <MenuItem value={'private'}>Private</MenuItem>

                        </Select>

                        {/* Upload file */}
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                            Choose your file
                            </Button>
                        </label>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Enter Project Title </div>
                      <TextField
                      name="projectTitle"
                      variant="outlined"
                      fullWidth
                      id="projectTitle"
                      placeholder="Brainfolio"
                      autoFocus
                      onChange={onInputChange}                   
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <div className={classes.field}> Start Date </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="startDate"
                      placeholder="July 2018"
                      name="startDate"
                      autoComplete="startDate"
                      onChange={onInputChange}                   

                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <div className={classes.field}> End Date </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="endDate"
                      placeholder="October 2018"
                      name="endDate"
                      autoComplete="endDate"
                      onChange={onInputChange}                   

                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Enter Contributors </div>
                      <div>
                        <TextField
                     
                        id="name"
                        label="Name"
                        placeholder="October 2018"
                        variant="outlined"
                        className={classes.contributor}
                        style={{marginRight:'4%'}}
                        onChange={onInputChange}                   

                        
                        />
                        <TextField
                        className={classes.contributor}
                        id="email"
                        label="Email"
                        placeholder="October 2018"
                        variant="outlined"
                        onChange={onInputChange}                   

                        />
                    </div>
                                    
                      
                      
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <div className={classes.field}> Project Description </div>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="desc"
                      placeholder="E-portfolio web application as a part of Capstone Project for COMP30022. The web app aims to enable users to showcase their skills and projects in one platform easily."
                      name="desc"
                      autoComplete="desc"
                      multiline
                      row={3}
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
                  Save to my Projects
                  </Button>
              </Grid>
            </form>
            </div>      
        </Container>
      <Container component="main" maxWidth="lg" className={classes.listContainer}>
        <Card className={classes.cardRoot}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your Projects
            </Typography>
            
            </CardContent>
            </Card>
      </Container>  
    </Container>

    );
  }