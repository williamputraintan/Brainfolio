import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import theme from '../../utils/theme'
import Contact from './Contact';
import Description from './Description';
import Education from './Education'
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Custom from './Custom';

const buttonStyles = makeStyles(() => ({
    container:{
        padding:'5%',
        height:'100%'
    },
    buttonContainer:{
        height:'15%'
    },
    formContainer:{
        height:'85%',
        padding:'1% 3% 3% 3%'
    },
    button:{
        backgroundColor:theme.palette.primary.main,
        color:theme.overrides.MuiButton.containedPrimary.color,
        margin:'1%',
        fontFamily:theme.typography.fontFamily,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#4C516D'
        },
    },
    buttonOn:{
        backgroundColor:theme.palette.secondary.main,
        color:'#4C516D',
        margin:'2%',
        fontFamily:theme.typography.fontFamily,
        "&:hover": {
            backgroundColor: "transparent"
          }

    }
}));

export default function EditingPage(props){
    const classes = buttonStyles();
    const { match, history } = props;
    const { params } = match;
    const { page } = params;
    
    const tabNameToIndex = {
      0: "contact",
      1: "description",
      2: "education",
      3: "experience",
      4: "skills",
      5: "projects",
      6: "custom"
    };
  
    const indexToTabName = {
      contact: 0,
      description: 1,
      education: 2,
      experience: 3,
      skills: 4,
      projects: 5,
      custom: 6
    };
  
    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

    function handleChange (newValue) {

      history.push(`/edit/${tabNameToIndex[newValue]}`);
      setSelectedTab(newValue);
    };
  

    return (
        <div className={classes.container}> 
            <div className={classes.buttonContainer}>
                <Button variant="contained" className={(page!=='contact')? classes.button :classes.buttonOn } onClick={()=>( handleChange(0))}>
                    Contact
                </Button>
                <Button variant="contained" className={(page!=='description')? classes.button :classes.buttonOn } onClick={()=>(handleChange(1))}>
                    Description
                </Button>
                <Button variant="contained" className={(page!=='education')? classes.button :classes.buttonOn }  onClick={()=>(handleChange(2))}>
                    Education
                </Button>
                <Button variant="contained" className={(page!=='experience')? classes.button :classes.buttonOn }onClick={()=>(handleChange(3))}>
                    Experience
                </Button>
                <Button variant="contained" className={(page!=='skills')? classes.button :classes.buttonOn } onClick={()=>(handleChange(4))}>
                    Skills
                </Button>
                <Button variant="contained" className={(page!=='projects')? classes.button :classes.buttonOn } onClick={()=>(handleChange(5))}>
                    Projects
                </Button>
                <Button variant="contained" className={(page!=='custom')? classes.button :classes.buttonOn } onClick={()=>(handleChange(6))}>
                    Custom
                </Button>
            </div>
            <div className={classes.formContainer}>
                {selectedTab === 0 && <Contact/>}
                {selectedTab === 1 && <Description />}
                {selectedTab === 2 && <Education />}
                {selectedTab === 3 && <Experience />}
                {selectedTab === 4 && <Skills />}
                {selectedTab === 5 && <Projects />}
                {selectedTab === 6 && <Custom />}
                
            </div>
        </div>

    );
}