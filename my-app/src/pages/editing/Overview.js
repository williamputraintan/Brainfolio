import React, {useContext, useEffect} from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {useStyles} from './Styles.js';
import {profileFields, experienceFields, educationFields, skillsFields} from './FieldNames.js';
import OverviewInfo from './OverviewInfo.js';

import { history } from '../../utils/BrowserHistory';
import AxiosInstance from '../../utils/axios';
import { UserContext } from '../../context/user.context';
import { Paper } from '@material-ui/core';

export default function Overview(){
    const {state} = useContext(UserContext);
    const classes = useStyles();

    const [profileData, setProfileData] = React.useState([]);
    const [educationData, setEducationData] = React.useState([]);
    const [workData, setWorkData] = React.useState([]);
    const [volunteerData, setVolunteerData] = React.useState([]);
    const [softSkillData, setSoftSkillData] = React.useState([]);
    const [techSkillData, setTechSkillData] = React.useState([]);
    // const [projectData, setProjectData] = React.useState([]);
    // const [custom1Data, setCustom1Data] = React.useState([]);
    // const [custom2Data, setCustom2Data] = React.useState([]);

    function getExistingProfile(){
        AxiosInstance.get("/edit/profile/user/"+state.user)
        .then(res=> setProfileData(res.data));
    }
    
    function getExistingEducation(){
        AxiosInstance.get("/edit/education/user/"+state.user)
        .then(res => setEducationData(res.data))
    }

    function getWorkExperience(){
        AxiosInstance.get("/edit/experience/user/work/"+state.user)
        .then(res=> setWorkData(res.data));
    }
      
    function getVolunteerExperience(){
        AxiosInstance.get("/edit/experience/user/volunteer/"+state.user)
        .then(res=> setVolunteerData(res.data));
    }

    function getExistingSoftSkills(){
        AxiosInstance.get("/edit/skills/user/soft/"+state.user)
        .then(res=> res? setSoftSkillData(res.data):null)
    }
  
    function getExistingTechSkills(){
        AxiosInstance.get("/edit/skills/user/tech/"+state.user)
        .then(res=> res? setTechSkillData(res.data):null)
    }
    
    useEffect(() => {
        getExistingProfile();
        getExistingEducation();
        getWorkExperience();
        getVolunteerExperience();
        getExistingSoftSkills();
        getExistingTechSkills();
    },[]);


    return (

          <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
              
                <Grid container spacing={3}> 
                    <List component="list" style={{width:'100%'}}>
                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Contact Details</Paper>
                                <OverviewInfo data={profileData} fieldNames={profileFields}/>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Education History</Paper>
                                
                                <OverviewInfo data={educationData} fieldNames={educationFields}/>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Experiences</Paper>
                                <div className={classes.fieldSubtitle}> Work Experiences</div>
                                <OverviewInfo data={workData} fieldNames={experienceFields}/>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        
                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <div className={classes.fieldSubtitle}>Volunteer Experiences</div>
                                <OverviewInfo data={volunteerData} fieldNames={experienceFields}/>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Projects</Paper>

                                display projects from database here
                            </Grid>
                        </ListItem>
                     
                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Skills List</Paper>
                                <div className={classes.fieldSubtitle}> <tab/> Soft Skills</div>
                                <OverviewInfo data={softSkillData} fieldNames={skillsFields}/>
                            </Grid>
                        </ListItem>      

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <div className={classes.fieldSubtitle}> <tab/>Technical Skills</div>
                                <OverviewInfo data={techSkillData} fieldNames={skillsFields}/>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Custom 1 Section</Paper>
                                display custom section from database here
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Custom 2 Section</Paper>
                                display custom section from database here
                            </Grid>
                        </ListItem>

                    </List>

                    <Grid  style={{width:'100%'}}>
                        <Button
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        color='primary'
                        >
                            Save my Portfolio
                        </Button>
                    </Grid>
                  </Grid>
    
              </div>
            </Container>
    )
}