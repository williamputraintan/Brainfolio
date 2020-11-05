import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {useStyles} from './Styles.js';
import {profileFields, experienceFields, educationFields, skillsFields, customFields} from './FieldNames.js';
import OverviewInfo from './OverviewInfo.js';

import { history } from '../../utils/BrowserHistory';
import AxiosInstance from '../../utils/axios';
import { UserContext } from '../../context/user.context';
import { Paper } from '@material-ui/core';
import {Trail} from './TrailSprings';

export default function Overview(){
    const {state} = useContext(UserContext);
    const classes = useStyles();
    const [open, set] = useState(true);
    const config = {
        headers: { Authorization: `Bearer ${state.token}` }
    };

    const [profileData, setProfileData] = React.useState([]);
    const [educationData, setEducationData] = React.useState([]);
    const [workData, setWorkData] = React.useState([]);
    const [volunteerData, setVolunteerData] = React.useState([]);
    const [softSkillData, setSoftSkillData] = React.useState([]);
    const [techSkillData, setTechSkillData] = React.useState([]);
    const [projectData, setProjectData] = React.useState([]);
    const [custom1Data, setCustom1Data] = React.useState([]);
    const [custom2Data, setCustom2Data] = React.useState([]);
    const [custom1Section, setCustom1Section] = React.useState();
    const [custom2Section, setCustom2Section] = React.useState();

    // function getExistingProfile(){
    //     AxiosInstance.get("/edit/profile/user/"+state.user)
    //     .then(res=> setProfileData(res.data));
    // }
    
    function getExistingEducation(){
        AxiosInstance.get("/edit/education/",config)
        .then(res => res? setEducationData(res.data): console.log(null))
    }

    function getExperience(){
        AxiosInstance.get("/edit/experience/",config)
        .then(res=> res? separateExpType(res.data):null);
    }
      
    function separateExpType(res){
        var workData=[];
        var volData=[]
        for (var i = 0, len = res.length; i < len; i++) {
          if(res[i].type==="Work"){
            workData.push(res[i]);
          }else{
            volData.push(res[i]);
          }
        }
        setWorkData(workData);
        setVolunteerData(volData);
    }

    function getExistingSkills(){
        AxiosInstance.get("/edit/skills/",config)
        .then(res=> res? separateSkillsType(res.data):null)
    }
  
    function separateSkillsType(res){
        var softData=[];
        var techData=[]
        for (var i = 0, len = res.length; i < len; i++) {
          if(res[i].category==="Soft"){
            softData.push(res[i]);
          }else{
            techData.push(res[i]);
          }
        }
        setSoftSkillData(softData);
        setTechSkillData(techData);
    }

    function getSectionItems(){
        AxiosInstance.get('edit/custom',config)
        .then(res=>getCustomOne(res.data))
        .catch(error=>console.log(error));
    }
  
    function getCustomOne(res){
        var customOne=[]
        var customTwo=[]

        for (var i = 0, len = res.length; i < len; i++) {
          if(res[i].type==="custom1"){
            customOne.push(res[i]);
          }else{
            customTwo.push(res[i]);
          }
        }
        setCustom1Data(customOne);
        setCustom2Data(customTwo);
    }


    function getCustom1Sec(){
        AxiosInstance.get('edit/custom/sectiontitle/custom1',config)
            .then(res=>setCustom1Section(res.data.sectionTitle))
            .catch(error=>console.log(error));
    }

    function getCustom2Sec(){
        AxiosInstance.get('edit/custom/sectiontitle/custom2',config)
            .then(res=>setCustom2Section(res.data.sectionTitle))
            .catch(error=>console.log(error));
    }

    function noEntry(){
        return (profileData.length==0 && educationData.length==0 && 
                workData.length==0 && volunteerData.length==0 && 
                softSkillData.length==0 && techSkillData.length==0 &&
                custom1Data.length==0&&custom2Data.length==0)
    }

    useEffect(() => {
        // getExistingProfile();
        getExistingEducation();
        getExperience();
        getExistingSkills();
        getSectionItems();
        getCustom1Sec();
        getCustom2Sec();
    },[]);


    return (
        <div style={{padding:'0 5%'}}>
          <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                <Grid container spacing={3}> 
                    {noEntry()?<Trail open={open}><div className={classes.noEntries}>No entries yet</div></Trail> :null}
                    <List component="list" style={{width:'100%'}}>
                        <ListItem className={profileData.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Contact Details</Paper>
                                {/* <OverviewInfo data={profileData} fieldNames={profileFields}/> */}
                            </Grid>
                        </ListItem>               
                        
                        <ListItem className={educationData.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Education History</Paper>
                                <OverviewInfo data={educationData} fieldNames={educationFields}/>
                            </Grid>
                        </ListItem>
                    
                        <ListItem className={workData.length==0 && volunteerData.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Experiences</Paper>
                                <div className={workData.length==0?classes.overviewNone:null}>
                                    <div className={classes.fieldSubtitle}> Work Experiences</div>
                                    <OverviewInfo data={workData} fieldNames={experienceFields}/>
                                </div>
                            </Grid>
                        </ListItem>
                        <Divider className={workData.length==0?classes.overviewNone:null}/>
                        
                        <ListItem className={volunteerData.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <div className={classes.fieldSubtitle}>Volunteer Experiences</div>
                                <OverviewInfo data={volunteerData} fieldNames={experienceFields}/>
                            </Grid>
                        </ListItem>
                       
                        <ListItem className={projectData.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Projects</Paper>

                                display projects from database here
                            </Grid>
                        </ListItem>
 
                        <ListItem className={softSkillData.length==0 && techSkillData.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your Skills List</Paper>
                                <div className={softSkillData.length==0?classes.overviewNone:null}>
                                    <div className={classes.fieldSubtitle}> <tab/> Soft Skills</div>
                                    <OverviewInfo data={softSkillData} fieldNames={skillsFields}/>
                                </div>
                            </Grid>
                        </ListItem>    
                        <Divider className={softSkillData.length<2?classes.overviewNone:null}/>  

                        <ListItem className={techSkillData.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <div className={classes.fieldSubtitle}> <tab/>Technical Skills</div>
                                <OverviewInfo data={techSkillData} fieldNames={skillsFields}/>
                            </Grid>
                        </ListItem>
                       
                        <ListItem className={custom1Data.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your {custom1Section? custom1Section : "Custom 1"} Section</Paper>
                                <OverviewInfo data={custom1Data} fieldNames={customFields}/>
                            </Grid>
                        </ListItem>

                        <ListItem className={custom2Data.length==0?classes.overviewNone:null}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.fieldTitleCont}>Your {custom2Section? custom2Section : "Custom 2"}  Section</Paper>
                                <OverviewInfo data={custom2Data} fieldNames={customFields}/>
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
    </div>
    )
}
